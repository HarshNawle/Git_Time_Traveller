import { apiClient } from "./client";
import type { AuthUser, RefreshResponse } from "@/types/auth";

let refreshInFlight: Promise<RefreshResponse> | null = null;

export const authApi = {
  /** Call this after OAuth redirect to get access token from refresh token cookie */
  refreshAccessToken: async (): Promise<RefreshResponse> => {
    if (refreshInFlight) {
      return refreshInFlight;
    }

    refreshInFlight = apiClient
      .post<RefreshResponse>("/auth/refresh")
      .then((response) => response.data)
      .finally(() => {
        refreshInFlight = null;
      });

    return refreshInFlight;
  },

  /** Get current user profile (requires valid access token) */
  getMe: async (accessToken: string): Promise<AuthUser> => {
    const response = await apiClient.get<AuthUser>("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  },

  /** Logout - revokes refresh token on backend */
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  /** Initiate GitHub OAuth - redirects to GitHub */
  initiateGitHubOAuth: (): string => {
    // Start on the backend origin so oauth cookies match GITHUB_CALLBACK_URL.
    const backendUrl =
      import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") || "";
    return backendUrl ? `${backendUrl}/api/auth/github` : "/api/auth/github";
  },
};