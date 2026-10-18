import { create } from "zustand";

import type { AuthUser } from "@/types/auth";

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
  
  // Computed selectors (for convenience)
  isAuthenticated: () => boolean;
  getUser: () => AuthUser | null;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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

  // Helper selectors
  isAuthenticated: () => get().status === "authenticated",
  getUser: () => get().user,
  getAccessToken: () => get().accessToken,
}));
