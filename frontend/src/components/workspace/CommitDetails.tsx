import {
  Flame,
  Sparkles,
  TrendingUp,
  GitCommitHorizontal,
} from "lucide-react";

// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRepository } from "@/hooks/queries/use-repository";
import { useContributorsStats } from "@/hooks/queries/use-commit";
import { useParams } from "react-router-dom";

const cardClass = `
  rounded-2xl
  border border-[#050402]/12
  bg-white/80
  p-4
  dark:border-[#F8F5EA]/15
  dark:bg-[#0b0b0b]
`;

export function CommitDetails() {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const { data: repository, isPending } = useRepository(repositoryId ?? "");
  // const { data: latestCommit, isPending: isCommitPending } = useLatestCommit(repository?.fullName ?? "");
  const { data: contributorsStats } = useContributorsStats(repository?.fullName ?? "");

  const formatNumber = (num: number) => num.toLocaleString();

  if (isPending) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className={cardClass}><div className="h-8 bg-white/80 dark:bg-white/5 rounded" /></div>
        <div className={cardClass}><div className="h-8 bg-white/80 dark:bg-white/5 rounded" /></div>
        <div className={cardClass}><div className="h-8 bg-white/80 dark:bg-white/5 rounded" /></div>
      </div>
    );
  }

  if (!repository) {
    return (
      <div className="space-y-4">
        <div className={cardClass}>
          <p className="text-red-500">Repository not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <div className={cardClass}>
        <h3 className="font-black">Latest Commit</h3>

        {isCommitPending ? (
          <div className="mt-3 space-y-3 animate-pulse">
            <div className="h-6 bg-white/80 dark:bg-white/5 rounded w-1/4" />
            <div className="h-8 bg-white/80 dark:bg-white/5 rounded w-1/2" />
            <div className="h-8 bg-white/80 dark:bg-white/5 rounded w-3/4" />
            <div className="h-8 bg-white/80 dark:bg-white/5 rounded w-1/2" />
            <div className="h-8 bg-white/80 dark:bg-white/5 rounded w-1/3" />
          </div>
        ) : latestCommit ? (
          <>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold">{latestCommit.sha}</span>
              <span className="text-xs opacity-50">
                {new Date(latestCommit.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <p className="mt-3 font-bold">{latestCommit.message}</p>

            <div className="mt-3 flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#C3DEB1] text-[#050402]">
                  {latestCommit.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-bold">{latestCommit.author.name}</p>
                <p className="text-xs opacity-50">@{latestCommit.author.login}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 border-t border-[#050402]/10 pt-4 text-sm">
              {latestCommit.files.length > 0 ? (
                latestCommit.files.map((file, index) => (
                  <FileChange
                    key={index}
                    name={file.filename}
                    additions={file.additions}
                    deletions={file.deletions}
                  />
                ))
              ) : (
                <p className="text-xs opacity-50">No file changes in this commit</p>
              )}
            </div>

            <a
              href={`${repository.htmlUrl}/commit/${latestCommit.sha}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="
                  mt-4 h-9 w-full rounded-full
                  border-[#050402]/15
                "
              >
                View on GitHub
                <ExternalLink />
              </Button>
            </a>
          </>
        ) : (
          <p className="mt-4 text-sm opacity-50">No commits found</p>
        )}
      </div> */}

      <div className={cardClass}>
        <div className="flex items-center gap-2">
          <GitCommitHorizontal className="size-4 text-sky-500" />
          <h3 className="font-black">Repository Stats</h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat value={contributorsStats?.totalCommits ? formatNumber(contributorsStats.totalCommits) : formatNumber(repository.commits)} label="Total Commits" />
          <Stat value={formatNumber(repository.stars)} label="Stars" />
          <Stat value={formatNumber(repository.forks)} label="Forks" />
          <Stat value={contributorsStats?.totalAuthors ? formatNumber(contributorsStats.totalAuthors) : "—"} label="Contributors" />
        </div>

        {contributorsStats && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat value={formatNumber(contributorsStats.totalAdditions)} label="Lines Added" positive />
            <Stat value={formatNumber(contributorsStats.totalDeletions)} label="Lines Deleted" negative />
          </div>
        )}
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-sky-500" />
            <h3 className="font-black">AI Insights</h3>
          </div>
          {/* <button className="text-xs font-semibold text-emerald-600">
            View all →
          </button> */}
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-red-500" />
              <p className="font-bold">High Churn Directory</p>
            </div>
            <p className="mt-1 text-sm opacity-60">
              {repository.name} - Run analysis to see detailed churn metrics.
            </p>
            <div className="mt-2 flex gap-2">
              <Badge className="rounded-full bg-red-100 text-red-700">
                Analysis Needed
              </Badge>
              <Badge className="rounded-full bg-[#EEEAF8] text-[#050402]">
                Run Analysis
              </Badge>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600" />
              <p className="font-bold">Code Quality</p>
            </div>
            <p className="mt-1 text-sm opacity-60">
              Connect your repository to enable AI-powered insights and complexity tracking.
            </p>
            <div className="mt-2 flex gap-2">
              <Badge className="rounded-full bg-amber-100 text-amber-800">
                Not Analyzed
              </Badge>
              <Badge className="rounded-full bg-[#EEEAF8] text-[#050402]">
                Start Analysis
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function FileChange({
//   name,
//   additions,
//   deletions,
// }: {
//   name: string;
//   additions: number;
//   deletions: number;
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="size-2 rounded-full bg-emerald-500" />
//       <span className="flex-1 truncate">{name}</span>
//       <span className="text-emerald-600">+{additions}</span>
//       <span className="text-red-500">-{deletions}</span>
//     </div>
//   );
// }

function Stat({
  value,
  label,
  positive,
  negative,
}: {
  value: string;
  label: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div>
      <p
        className={`
          text-xl font-black
          ${positive ? "text-emerald-600" : negative ? "text-red-500" : ""}
        `}
      >
        {value}
      </p>
      <p className="text-xs opacity-50">{label}</p>
    </div>
  );
}
