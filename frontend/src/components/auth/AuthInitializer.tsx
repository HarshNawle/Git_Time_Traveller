import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

export function AuthInitializer() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    if (window.location.pathname.startsWith("/auth/github/callback")) {
      return;
    }

    initializeAuth();
  }, [initializeAuth]);

  return null;
}