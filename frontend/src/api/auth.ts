import { apiClient } from "./client";
import type { AuthUser, RefreshResponse } from "@/types/auth";

export const authApi = {
  /** Call this after OAuth redirect to get access token from refresh token cookie */
  refreshAccessToken: async (): Promise<RefreshResponse> => {
    const response = await apiClient.post<RefreshResponse>("/api/auth/refresh");
    return response.data;
  },

  /** Get current user profile (requires valid access token) */
  getMe: async (accessToken: string): Promise<AuthUser> => {
    const response = await apiClient.get<AuthUser>("/api/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  },

  /** Logout - revokes refresh token on backend */
  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },

  /** Initiate GitHub OAuth - redirects to GitHub */
  initiateGitHubOAuth: (): string => {
    // The backend endpoint that starts the OAuth flow
    const backendUrl = import.meta.env.VITE_API_URL?.replace("/api", "") || "";
    return `${backendUrl}/api/auth/github`;
  },
};