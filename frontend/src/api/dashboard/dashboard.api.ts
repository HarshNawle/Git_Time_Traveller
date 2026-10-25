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
    defaultBranch: repo.default_branch,
  };
}

function formatMemberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function getTotalCountFromPaginated(url: string): Promise<number> {
  const response = await fetch(`${url}&per_page=1`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  const link = response.headers.get("Link");
  if (link && link.includes('rel="last"')) {
    const match = link.match(/page=(\d+)>; rel="last"/);
    return match ? parseInt(match[1], 10) : 0;
  }
  const data = await response.json();
  return Array.isArray(data) ? data.length : 0;
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

export const repoDetailApi = {
  async getContributorsCount(owner: string, repo: string): Promise<number> {
    return getTotalCountFromPaginated(`${GITHUB_API_URL}/repos/${owner}/${repo}/contributors?anon=1`);
  },

  async getBranchesCount(owner: string, repo: string): Promise<number> {
    return getTotalCountFromPaginated(`${GITHUB_API_URL}/repos/${owner}/${repo}/branches`);
  },

  async getLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    return githubJson<Record<string, number>>(`${GITHUB_API_URL}/repos/${owner}/${repo}/languages`);
  },

  async getFullDetail(owner: string, repo: string): Promise<{
    contributorsCount: number;
    branchesCount: number;
    languages: Record<string, number>;
  }> {
    const [contributorsCount, branchesCount, languages] = await Promise.all([
      this.getContributorsCount(owner, repo),
      this.getBranchesCount(owner, repo),
      this.getLanguages(owner, repo),
    ]);
    return { contributorsCount, branchesCount, languages };
  },
};

export const commitApi = {
  async getLatestCommit(owner: string, repo: string): Promise<{
    sha: string;
    date: string;
    message: string;
    author: {
      name: string;
      login: string;
      avatarUrl: string;
    };
    files: Array<{
      filename: string;
      additions: number;
      deletions: number;
    }>;
  } | null> {
    try {
      // Get latest commit
      const commits = await githubJson<Array<{
        sha: string;
        commit: {
          author: {
            date: string;
            name: string;
          };
          message: string;
        };
        author: {
          login: string;
          avatar_url: string;
        } | null;
      }>>(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits?per_page=1`);

      if (!commits.length) return null;

      const commit = commits[0];
      
      // Get commit details with files
      const commitDetail = await githubJson<{
        sha: string;
        commit: {
          author: {
            date: string;
            name: string;
          };
          message: string;
        };
        author: {
          login: string;
          avatar_url: string;
        } | null;
        files: Array<{
          filename: string;
          additions: number;
          deletions: number;
        }>;
      }>(`${GITHUB_API_URL}/repos/${owner}/${repo}/commits/${commit.sha}`);

      return {
        sha: commitDetail.sha.slice(0, 7),
        date: commitDetail.commit.author.date,
        message: commitDetail.commit.message.split("\n")[0],
        author: {
          name: commitDetail.commit.author.name,
          login: commitDetail.author?.login || "unknown",
          avatarUrl: commitDetail.author?.avatar_url || "",
        },
        files: commitDetail.files?.slice(0, 10).map(f => ({
          filename: f.filename,
          additions: f.additions,
          deletions: f.deletions,
        })) || [],
      };
    } catch {
      return null;
    }
  },

  async getContributorsStats(owner: string, repo: string): Promise<{
    totalCommits: number;
    totalAuthors: number;
    totalAdditions: number;
    totalDeletions: number;
  }> {
    try {
      const contributors = await githubJson<Array<{
        author: { login: string };
        total: number;
        weeks: Array<{ a: number; d: number }>;
      }>>(`${GITHUB_API_URL}/repos/${owner}/${repo}/stats/contributors`);

      const totalCommits = contributors.reduce((sum, c) => sum + c.total, 0);
      const totalAuthors = contributors.length;
      const totalAdditions = contributors.reduce((sum, c) => 
        sum + c.weeks.reduce((w, wk) => w + wk.a, 0), 0);
      const totalDeletions = contributors.reduce((sum, c) => 
        sum + c.weeks.reduce((w, wk) => w + wk.d, 0), 0);

      return { totalCommits, totalAuthors, totalAdditions, totalDeletions };
    } catch {
      return { totalCommits: 0, totalAuthors: 0, totalAdditions: 0, totalDeletions: 0 };
    }
  },
};
