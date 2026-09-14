import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

// Zustand
//    │
//    ├── theme
//    ├── mobileMenuOpen
//    └── future UI state

interface UIState {
  theme: Theme;
  mobileMenuOpen: boolean;

  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      mobileMenuOpen: false,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      setTheme: (theme) => set({ theme }),

      setMobileMenuOpen: (open) =>
        set({
          mobileMenuOpen: open,
        }),
    }),
    {
      name: "git-history-ui",
    }
  )
);