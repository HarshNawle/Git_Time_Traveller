import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      mobileMenuOpen: false,

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