import { useMemo, useState } from "react";

import AccountOverview from "@/components/dashboard/AccountOverview";
import AccountStatsGrid from "@/components/dashboard/AccountStatsGrid";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import RepositoryFilters, {
  type RepositorySort,
  type RepositoryView,
} from "@/components/repositories/RepositoryFilters";
import RepositoryGrid from "@/components/repositories/RepositoryGrid";
import RepositoryList from "@/components/repositories/RepositoryList";
import RepositorySearch from "@/components/repositories/RepositorySearch";
import { useDashboardStats } from "@/hooks/queries/use-dashboard-stats";
import { useMe } from "@/hooks/queries/use-me";
import { useAuthStore } from "@/stores/auth.store";
import { WorkspaceTopBar } from "@/components/workspace/WorkspaceTopBar";

export default function DashboardPage() {
  const authUser = useAuthStore((state) => state.user);
  const { data: user, isPending: isUserPending, isError: isUserError } = useMe();
  const username = user?.githubUsername ?? authUser?.githubUsername;

  const { data, isPending, isError } = useDashboardStats(username);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<RepositorySort>("updated");
  const [view, setView] = useState<RepositoryView>("list");

  const displayName =
    data?.profile.name ?? user?.displayName ?? authUser?.displayName ?? "there";
  const firstName = displayName.split(" ")[0];

  const repositories = useMemo(() => {
    const query = filter.trim().toLowerCase();
    const list = data?.repositories ?? [];

    const filtered = query
      ? list.filter((repo) =>
          [repo.name, repo.description, repo.language]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query),
        )
      : list;

    return [...filtered].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "name") return a.name.localeCompare(b.name);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [data?.repositories, filter, sort]);

  const loading = isUserPending || (Boolean(username) && isPending);

  return (
    <div className="min-h-screen p-2 bg-[#F8F5EA] text-[#050402] dark:bg-[#050402] dark:text-[#F8F5EA]">
      <WorkspaceTopBar />

      <div className="flex min-h-[calc(100vh-72px)] gap-2">
        <DashboardSidebar repositoryId={repositories[0]?.id} />

        <main className="min-w-0 mt-1.5 flex-1 p-4 lg:p-6 font-mono rounded-2xl
            border border-[#050402]/12
          dark:border-[#F8F5EA]/15
          dark:bg-[#0b0b0b]">
          <div className="mx-auto max-w-[1600px] space-y-4">
          {isUserError && !authUser ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              Unable to load your dashboard. Please sign in again.
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              Could not load your GitHub repositories right now.
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
              <section className="min-w-0 space-y-6">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Welcome back, {firstName}!{" "}
                    <span aria-hidden>👋</span>
                  </h1>
                  <p className="mt-2 text-sm text-[#050402]/55 dark:text-[#F8F5EA]/55">
                    Here are your GitHub repositories and overall statistics.
                  </p>
                </div>

                {data?.stats || loading ? (
                  <AccountStatsGrid
                    stats={
                      data?.stats ?? {
                        totalRepositories: 0,
                        totalCommits: 0,
                        contributors: 0,
                        totalLinesChanged: 0,
                        repositoryChange: 0,
                        commitChange: 0,
                        contributorChange: 0,
                        linesChange: 0,
                      }
                    }
                    loading={loading}
                  />
                ) : null}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Your Repositories</h2>
                    <span className="rounded-full bg-[#EDE4FF] px-2.5 py-0.5 text-sm font-medium text-[#050402]">
                      {repositories.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <RepositorySearch value={filter} onChange={setFilter} />
                    <RepositoryFilters
                      sort={sort}
                      view={view}
                      onSortChange={setSort}
                      onViewChange={setView}
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-24 animate-pulse rounded-2xl bg-white/80 dark:bg-white/5"
                      />
                    ))}
                  </div>
                ) : view === "list" ? (
                  <RepositoryList repositories={repositories} />
                ) : (
                  <RepositoryGrid repositories={repositories} />
                )}
              </section>

              <div className="hidden xl:block">
                {data?.profile ? (
                  <AccountOverview profile={data.profile} />
                ) : (
                  <div className="h-96 animate-pulse rounded-2xl bg-white/80 dark:bg-white/5" />
                )}
              </div>
            </div>
          )}
        </div>
        </main>
      </div>
    </div>
  );
}
