import { useParams } from "react-router-dom";
import { TimelineCanvas } from "@/components/visualization/TimelineCanvas";
import { CommitDetails } from "@/components/workspace/CommitDetails";
import { WorkspaceTopBar } from "@/components/workspace/WorkspaceTopBar";
import { RecentCommits } from "@/components/workspace/RecentCommits";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
// import WorkspaceTabs from "@/components/workspace/WorkspaceTabs";
import RepositoryGrid from "@/components/repositories/RepositoryGrid";
import RepositoryList from "@/components/repositories/RepositoryList";
import RepositoryFilters, { type RepositorySort, type RepositoryView } from "@/components/repositories/RepositoryFilters";
import RepositorySearch from "@/components/repositories/RepositorySearch";
import { useState, useMemo } from "react";
import { useUserRepositories } from "@/hooks/queries/use-user-repos";
import { useRepository } from "@/hooks/queries/use-repository";

const MyReposPage = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  
  // For repo list view (when no repositoryId)
  const { data: repositories, isPending, isError } = useUserRepositories();
  
  // For single repo detail view (when repositoryId exists)
  const { data: repository, isPending: isRepoPending } = useRepository(repositoryId ?? "");

  // Reuse filter/sort logic from DashboardPage
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<RepositorySort>("updated");
  const [view, setView] = useState<RepositoryView>("list");

  const filteredRepos = useMemo(() => {
    const query = filter.trim().toLowerCase();
    const list = repositories ?? [];

    const filtered = query
      ? list.filter((repo) =>
          [repo.name, repo.description, repo.language]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query)
        )
      : list;

    return [...filtered].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "name") return a.name.localeCompare(b.name);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [repositories, filter, sort]);

  // If viewing a specific repository - show detail view
  if (repositoryId) {
    if (isRepoPending) {
      return <div className="flex items-center justify-center h-64">Loading...</div>;
    }
    if (!repository) {
      return <div className="flex items-center justify-center h-64">Repository not found</div>;
    }

    return (
      <div className="min-h-screen p-2 bg-[#F8F5EA] dark:bg-[#050402]">
        <WorkspaceTopBar />
        <div className="flex min-h-[calc(100vh-72px)] gap-2">
          <WorkspaceSidebar repositoryId={repositoryId} />
          <main className="min-w-0 mt-1.5 flex-1 p-4 lg:p-6 font-mono rounded-2xl border border-[#050402]/12 dark:border-[#F8F5EA]/15 dark:bg-[#0b0b0b]">
            <div className="mx-auto max-w-[1600px] space-y-4">
              <WorkspaceHeader />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
                <section className="min-w-0 space-y-4">
                  {/* <WorkspaceTabs repositoryId={repositoryId} /> */}
                  <TimelineCanvas />
                  <RecentCommits />
                </section>
                <aside className="hidden xl:block">
                  <CommitDetails />
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Default: Show repository list (like DashboardPage)
  return (
    <div className="min-h-screen p-2 bg-[#F8F5EA] dark:bg-[#050402]">
      <WorkspaceTopBar />
      <div className="flex min-h-[calc(100vh-72px)] gap-2">
        <aside className="hidden lg:flex w-[240px] shrink-0" />
        <main className="min-w-0 mt-1.5 flex-1 p-4 lg:p-6 font-mono rounded-2xl border border-[#050402]/12 dark:border-[#F8F5EA]/15 dark:bg-[#0b0b0b]">
          <div className="mx-auto max-w-[1600px] space-y-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Your Repositories</h1>
              <p className="mt-2 text-sm text-[#050402]/55 dark:text-[#F8F5EA]/55">
                Select a repository to view its timeline and analysis.
              </p>
            </div>

            {isError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                Could not load your repositories.
              </div>
            )}

            {!isError && (
              <>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Your Repositories</h2>
                    <span className="rounded-full bg-[#EDE4FF] px-2.5 py-0.5 text-sm font-medium text-[#050402]">
                      {filteredRepos.length}
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

                {isPending ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="h-24 animate-pulse rounded-2xl bg-white/80 dark:bg-white/5" />
                    ))}
                  </div>
                ) : view === "list" ? (
                  <RepositoryList repositories={filteredRepos} />
                ) : (
                  <RepositoryGrid repositories={filteredRepos} />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyReposPage;