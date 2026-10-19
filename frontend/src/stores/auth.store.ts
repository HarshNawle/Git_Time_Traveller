import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthUser } from "@/types/auth";
import { authApi } from "@/api/auth";

type AuthStatus = "idle" | "loading" | "authenticated" | "anonymous";

interface AuthState {
  status: AuthStatus;
  accessToken: string | null;
  user: AuthUser | null;
  
  // Actions
  setSession: (accessToken: string, user: AuthUser) => void;
  setAccessToken: (accessToken: string) => void;
  setStatus: (status: AuthStatus) => void;
  clearSession: () => void;
  
  // Initialization - restores session from refresh token cookie
  initializeAuth: () => Promise<void>;
  
  // Computed selectors (for convenience)
  isAuthenticated: () => boolean;
  getUser: () => AuthUser | null;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      status: "idle",
      accessToken: null,
      user: null,

      setSession: (accessToken, user) =>
        set({
          accessToken,
          user,
          status: "authenticated",
        }),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
        }),

      setStatus: (status) => set({ status }),

      clearSession: () =>
        set({
          accessToken: null,
          user: null,
          status: "anonymous",
        }),

      // Initialize auth on app load - tries to refresh token using HTTP-only cookie
      initializeAuth: async () => {
        const currentStatus = get().status;
        
        // Skip if already authenticated or currently loading
        if (currentStatus === "authenticated" || currentStatus === "loading") {
          return;
        }

        set({ status: "loading" });

        try {
          // Try to get new access token from refresh token cookie
          const { accessToken } = await authApi.refreshAccessToken();
          
          // Fetch user profile with the new access token
          const user = await authApi.getMe(accessToken);
          
          // Store session
          set({
            accessToken,
            user,
            status: "authenticated",
          });
        } catch (error) {
          // Refresh failed - user needs to log in again
          console.log("Auth initialization failed, user needs to log in:", error);
          set({
            accessToken: null,
            user: null,
            status: "anonymous",
          });
        }
      },

      // Helper selectors
      isAuthenticated: () => get().status === "authenticated",
      getUser: () => get().user,
      getAccessToken: () => get().accessToken,
    }),
    {
      name: "git-history-auth",
      // Only persist user data (not accessToken for security)
      partialize: (state) => ({ user: state.user }),
    }
  )
);
