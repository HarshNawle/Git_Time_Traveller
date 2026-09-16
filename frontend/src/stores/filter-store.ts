import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FilterState {
  // Search
  search: string;

  // Git branch
  branch: string;

  // Author
  author: string;

  // Date range
  fromDate: string | null;
  toDate: string | null;

  // Actions
  setSearch: (search: string) => void;

  setBranch: (branch: string) => void;

  setAuthor: (author: string) => void;

  setDateRange: (
    fromDate: string | null,
    toDate: string | null
  ) => void;

  resetFilters: () => void;
}

export const useFilterStore =
  create<FilterState>()(
    devtools(
      persist(
        (set) => ({
          // Initial state
          search: "",

          branch: "main",

          author: "",

          fromDate: null,

          toDate: null,

          // Actions
          setSearch: (search) => {
            set({
              search,
            });
          },

          setBranch: (branch) => {
            set({
              branch,
            });
          },

          setAuthor: (author) => {
            set({
              author,
            });
          },

          setDateRange: (
            fromDate,
            toDate
          ) => {
            set({
              fromDate,
              toDate,
            });
          },

          resetFilters: () => {
            set({
              search: "",
              branch: "main",
              author: "",
              fromDate: null,
              toDate: null,
            });
          },
        }),
        {
          name: "git-history-filters",
        }
      )
    )
  );