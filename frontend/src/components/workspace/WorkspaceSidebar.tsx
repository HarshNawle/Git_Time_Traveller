import { useRepository } from "@/hooks/queries/use-repository";
import { useRepoDetail } from "@/hooks/queries/use-repo-detail";
import {
  BarChart3,
  ExternalLink,
  Flame,
  GitBranch,
  Lightbulb,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface WorkspaceSidebarProps {
  repositoryId: string;
}

export function WorkspaceSidebar({
  repositoryId,
}: WorkspaceSidebarProps) {
  const navigate = useNavigate();
  const { data: repository, isPending } = useRepository(repositoryId);
  const { data: detail, isPending: isDetailPending } = useRepoDetail(repository?.fullName ?? "");

  const go = (path: string) => {
    navigate(`/my-repos/${repositoryId}/${path}`);
  };

  const formatNumber = (num: number) => num.toLocaleString();
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  if (isPending) {
    return (
      <aside className="sticky top-[85px] rounded-2xl hidden h-[calc(100vh-72px)] w-[240px] shrink-0 flex-col border border-[#050402]/10 bg-[#F8F5EA] p-4 lg:flex dark:border-[#F8F5EA]/10 dark:bg-[#080808]">
        <div className="space-y-3 animate-pulse">
          <div className="h-5 bg-white/80 dark:bg-white/5 rounded" />
          <div className="h-4 bg-white/80 dark:bg-white/5 rounded" />
          <div className="h-4 bg-white/80 dark:bg-white/5 rounded" />
        </div>
      </aside>
    );
  }

  if (!repository) {
    return (
      <aside className="sticky top-[85px] rounded-2xl hidden h-[calc(100vh-72px)] w-[240px] shrink-0 flex-col border border-[#050402]/10 bg-[#F8F5EA] p-4 lg:flex dark:border-[#F8F5EA]/10 dark:bg-[#080808]">
        <p className="text-red-500 text-sm">Repository not found</p>
      </aside>
    );
  }

  return (
    <aside className="sticky top-[85px] rounded-2xl hidden h-[calc(100vh-72px)] w-[240px] shrink-0 flex-col border border-[#050402]/10 bg-[#F8F5EA] p-4 lg:flex dark:border-[#F8F5EA]/10 dark:bg-[#080808]">
      <div className="px-1">
        <p className="text-[11px] font-mono font-bold uppercase tracking-wide opacity-45">
          Repository
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#050402] text-white dark:bg-white dark:text-black">
            <GitBranch className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-mono font-bold">{ repository.fullName }</p>
            <p className="truncate text-xs font-mono opacity-55">
              { repository.description }
            </p>
          </div>

          <ExternalLink className="size-4 shrink-0 opacity-40" />
        </div>
      </div>

      <nav className="mt-8 space-y-1 font-mono">
        <SidebarItem
          icon={<BarChart3 className="size-4 " />}
          label="Timeline"
          active
          onClick={() => go("timeline")}
        />

        <SidebarItem
          icon={<Flame className="size-4" />}
          label="Heatmap"
          onClick={() => go("heatmap")}
        />

        <SidebarItem
          icon={<Users className="size-4" />}
          label="Contributors"
          onClick={() => go("contributors")}
        />

        <SidebarItem
          icon={<Lightbulb className="size-4" />}
          label="Insights"
          onClick={() => go("insights")}
        />
      </nav>

      <div className="mt-8 px-1">
        <p className="text-[15px] font-mono font-bold uppercase tracking-wide opacity-45">
          Repository Info
        </p>

        <div className="mt-4 space-y-3.5 text-sm font-mono font-bold">
          <InfoRow label="Commits" value={ formatNumber(repository.commits) } />
          <InfoRow label="Stars" value={ formatNumber(repository.stars) } />
          <InfoRow label="Forks" value={ formatNumber(repository.forks) } />
          <InfoRow label="Language" value={ repository.language || "—" } />
          <InfoRow label="Updated" value={ formatDate(repository.updatedAt) } />
          <InfoRow label="Visibility" value={ repository.isPrivate ? "Private" : "Public" } />

          {isDetailPending ? (
            <>
              <InfoRow label="Contributors" value={<span className="animate-pulse">...</span>} />
              <InfoRow label="Branches" value={<span className="animate-pulse">...</span>} />
            </>
          ) : detail ? (
            <>
              <InfoRow label="Contributors" value={ formatNumber(detail.contributorsCount) } />
              <InfoRow label="Branches" value={ formatNumber(detail.branchesCount) } />
              {detail.languages && Object.keys(detail.languages).length > 0 && (
                <InfoRow
                  label="Languages"
                  value={
                    Object.entries(detail.languages)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([lang]) => lang)
                      .join(", ")
                  }
                />
              )}
            </>
          ) : (
            <>
              <InfoRow label="Contributors" value="—" />
              <InfoRow label="Branches" value="—" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3
        rounded-xl px-3 py-2.5
        text-sm font-semibold
        transition
        ${
          active
            ? "bg-[#E4D4FF] text-[#050402]"
            : "opacity-70 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/8"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="opacity-55">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
