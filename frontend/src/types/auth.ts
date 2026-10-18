export interface AuthUser {
  id: string;
  githubUsername: string;
  displayName: string;
  email: string | null;
  avatarUrl: string;
}

export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}
