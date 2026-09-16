import { TimelineCanvas } from "@/components/visualization/TimelineCanvas";
import { CommitDetails } from "@/components/workspace/CommitDetails";
import { WorkspaceTopBar } from "@/components/workspace/WorkspaceTopBar";
import { RecentCommits } from "@/components/workspace/RecentCommits";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import WorkspaceTabs from "@/components/workspace/WorkspaceTabs";
import { useParams } from "react-router-dom";

const TimelinePage = () => {
  const { repositoryId } = useParams<{
    repositoryId: string;
  }>();

  const repoId = repositoryId ?? "demo";

  return (
    <div className="min-h-screen p-2 bg-[#F8F5EA] dark:bg-[#050402]">
      <WorkspaceTopBar />

      <div className="flex min-h-[calc(100vh-72px)] gap-2">
        <WorkspaceSidebar repositoryId={repoId} />

        <main className="min-w-0 mt-1.5  flex-1 p-4 lg:p-6 font-mono rounded-2xl
            border border-[#050402]/12
          dark:border-[#F8F5EA]/15
          dark:bg-[#0b0b0b]">
          <div className="mx-auto max-w-[1600px] space-y-4">
            <WorkspaceHeader />

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
              <section className="min-w-0 space-y-4">
                <WorkspaceTabs repositoryId={repoId} />
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
};

export default TimelinePage;
