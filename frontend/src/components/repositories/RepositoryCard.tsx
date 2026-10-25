import { Link } from "react-router-dom";
import { ArrowRight, GitFork, Star } from "lucide-react";

import type { DashboardRepository } from "@/types/dashboard";
import { formatCompactNumber, languageColor } from "@/lib/format";
import ActivitySparkline from "@/components/repositories/ActivitySparkline";

interface RepositoryCardProps {
  repository: DashboardRepository;
  sparklineColor?: string;
}

export default function RepositoryCard({
  repository,
  sparklineColor,
}: RepositoryCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#050402]/8 bg-white p-5 dark:border-[#F8F5EA]/10 dark:bg-[#111111]">
      <div className="flex items-start gap-3">
        <RepoAvatar name={repository.name} src={repository.avatarUrl} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold">{repository.name}</h3>
            <VisibilityBadge isPrivate={repository.isPrivate} />
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-[#050402]/55 dark:text-[#F8F5EA]/55">
            {repository.description || "No description available"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-[#050402]/55 dark:text-[#F8F5EA]/55">
        {repository.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: languageColor(repository.language) }}
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
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        <ActivitySparkline values={repository.activity} color={sparklineColor} />
        <Link
          to={`/my-repos/${repository.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium"
        >
          View Analysis
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

export function RepoAvatar({ name, src }: { name: string; src: string }) {
  return (
    <img
      src={src}
      alt={name}
      className="size-10 shrink-0 rounded-full object-cover"
    />
  );
}

export function VisibilityBadge({ isPrivate }: { isPrivate: boolean }) {
  return (
    <span
      className={
        isPrivate
          ? "rounded-full bg-[#F8D7E3] px-2 py-0.5 text-[11px] font-medium text-[#B54871]"
          : "rounded-full bg-[#D8F0C8] px-2 py-0.5 text-[11px] font-medium text-[#4F7A24]"
      }
    >
      {isPrivate ? "Private" : "Public"}
    </span>
  );
}
