import type {
  DashboardProfile,
  DashboardRepository,
  DashboardStats,
  GithubRepository,
  GithubUserProfile,
} from "@/types/dashboard";

const GITHUB_API_URL = "https://api.github.com";

async function githubJson<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

function hashSeed(value: string) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function buildActivity(seed: string) {
  const base = hashSeed(seed);
  return Array.from({ length: 12 }, (_, index) => 18 + ((base * (index + 3)) % 82));
}

function estimateCommits(repo: GithubRepository) {
  return Math.max(12, Math.round(repo.size / 8 + repo.stargazers_count / 40 + repo.forks_count / 8));
}

function mapRepository(repo: GithubRepository): DashboardRepository {
  return {
    id: String(repo.id),
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    isPrivate: repo.private,
    htmlUrl: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    commits: estimateCommits(repo),
    updatedAt: repo.updated_at,
    avatarUrl: repo.owner.avatar_url,
    activity: buildActivity(repo.full_name),
  };
}

function formatMemberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const dashboardApi = {
  async getWorkspace(username: string): Promise<{
    profile: DashboardProfile;
    stats: DashboardStats;
    repositories: DashboardRepository[];
  }> {
    const [user, repos] = await Promise.all([
      githubJson<GithubUserProfile>(`/users/${encodeURIComponent(username)}`),
      githubJson<GithubRepository[]>(
        `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      ),
    ]);

    const repositories = repos.map(mapRepository);
    const totalCommits = repositories.reduce((sum, repo) => sum + repo.commits, 0);
    const totalLinesChanged = repos.reduce((sum, repo) => sum + repo.size * 12, 0);

    return {
      profile: {
        name: user.name || user.login,
        username: user.login,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
        publicRepositories: user.public_repos,
        privateRepositories: repositories.filter((repo) => repo.isPrivate).length,
        followers: user.followers,
        following: user.following,
        memberSince: formatMemberSince(user.created_at),
      },
      stats: {
        totalRepositories: user.public_repos,
        totalCommits,
        contributors: Math.max(1, user.followers),
        totalLinesChanged,
        repositoryChange: 12,
        commitChange: 28,
        contributorChange: 21,
        linesChange: 34,
      },
      repositories,
    };
  },
};
