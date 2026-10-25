export interface GithubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
}

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  default_branch: string;
  open_issues_count: number;
  size: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface DashboardRepository {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  commits: number;
  updatedAt: string;
  avatarUrl: string;
  activity: number[];
  defaultBranch: string;
}

export interface DashboardStats {
  totalRepositories: number;
  totalCommits: number;
  contributors: number;
  totalLinesChanged: number;
  repositoryChange: number;
  commitChange: number;
  contributorChange: number;
  linesChange: number;
}

export interface DashboardProfile {
  name: string;
  username: string;
  avatarUrl: string;
  htmlUrl: string;
  publicRepositories: number;
  privateRepositories: number;
  followers: number;
  following: number;
  memberSince: string;
}
