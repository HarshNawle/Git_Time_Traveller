import { Link } from "react-router-dom";
import { ArrowRight, Calendar, GitCommitHorizontal, GitFork, MoreHorizontal, Star } from "lucide-react";

import type { DashboardRepository } from "@/types/dashboard";
import {
  formatCompactNumber,
  formatRelativeUpdated,
  languageColor,
} from "@/lib/format";
import ActivitySparkline from "@/components/repositories/ActivitySparkline";
import {
  RepoAvatar,
  VisibilityBadge,
} from "@/components/repositories/RepositoryCard";
import RepositoryEmptyState from "@/components/repositories/RepositoryEmptyState";

const sparklineColors = ["#7C6CF0", "#62B35A", "#E278A0", "#8B7CF6", "#4C9BE8"];

interface RepositoryListProps {
  repositories: DashboardRepository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return <RepositoryEmptyState />;
  }

  return (
    <div className="space-y-3">
      {repositories.map((repository, index) => (
        <article
          key={repository.id}
          className="flex flex-col gap-4 rounded-2xl border border-[#050402]/8 bg-white px-4 py-4 sm:flex-row sm:items-center dark:border-[#F8F5EA]/10 dark:bg-[#111111]"
        >
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <RepoAvatar name={repository.name} src={repository.avatarUrl} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-semibold">
                  {repository.name}
                </h3>
                <VisibilityBadge isPrivate={repository.isPrivate} />
              </div>

              <p className="mt-1 line-clamp-1 text-sm text-[#050402]/55 dark:text-[#F8F5EA]/55">
                {repository.description || "No description available"}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#050402]/50 dark:text-[#F8F5EA]/50">
                {repository.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor: languageColor(repository.language),
                      }}
                    />
                    {repository.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3" />
                  {formatCompactNumber(repository.stars)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3" />
                  {formatCompactNumber(repository.forks)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitCommitHorizontal className="size-3" />
                  {repository.commits.toLocaleString()} commits
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" />
                  {formatRelativeUpdated(repository.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <ActivitySparkline
              values={repository.activity}
              color={sparklineColors[index % sparklineColors.length]}
            />

            <Link
              to={`/workspace/${repository.id}/timeline`}
              className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium"
            >
              View Analysis
              <ArrowRight className="size-3.5" />
            </Link>

            <button
              type="button"
              className="rounded-lg p-1 text-[#050402]/40 hover:bg-black/5 dark:text-[#F8F5EA]/40"
              aria-label={`More actions for ${repository.name}`}
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
