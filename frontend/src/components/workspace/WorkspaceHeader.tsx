import {
  CalendarDays,
  GitBranch,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRepository } from "@/hooks/queries/use-repository";
import { useRepoDetail } from "@/hooks/queries/use-repo-detail";
import { useParams } from "react-router-dom";

const WorkspaceHeader = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const { data: repository, isPending } = useRepository(repositoryId ?? "");
  const { data: detail } = useRepoDetail(repository?.fullName ?? "");

  const formatNumber = (num: number) => num.toLocaleString();

  if (isPending) {
    return (
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between animate-pulse">
        <div className="h-10 bg-white/80 dark:bg-white/5 rounded w-1/2" />
        <div className="h-10 bg-white/80 dark:bg-white/5 rounded w-1/3" />
      </section>
    );
  }

  if (!repository) {
    return (
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-red-500">Repository not found</h1>
        </div>
      </section>
    );
  }

  const tags = detail?.languages
    ? Object.entries(detail.languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang)
    : [];

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight">
            {repository.fullName}
          </h1>

          <Badge
            variant="outline"
            className="
              h-6 gap-1 rounded-full
              border-[#050402]/15
              bg-white px-2
              dark:border-[#F8F5EA]/20
              dark:bg-[#111]
            "
          >
            <Star className="size-3 fill-current" />
            {formatNumber(repository.stars)}
          </Badge>

          <Badge
            variant="outline"
            className="
              h-6 gap-1 rounded-full
              border-[#050402]/15
              bg-white px-2
              dark:border-[#F8F5EA]/20
              dark:bg-[#111]
            "
          >
            <GitBranch className="size-3" />
            {formatNumber(repository.forks)} forks
          </Badge>
        </div>

        {/* <p className="mt-1 text-sm opacity-55">
          {repository.description || "No description available."}
        </p> */}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                bg-[#EEEAF8]
                px-2.5 py-1
                text-xs font-medium
                dark:bg-white/10
              "
            >
              {tag}
            </span>
          ))}
          {tags.length === 0 && (
            <span className="rounded-full bg-[#EEEAF8] px-2.5 py-1 text-xs font-medium dark:bg-white/10">
              {repository.language || "No languages"} 
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="
            h-10 rounded-full
            border-[#050402]/15
            bg-white px-3
            dark:border-[#F8F5EA]/20
            dark:bg-[#111]
          "
        >
          <CalendarDays />
          {repository.updatedAt ? new Date(repository.updatedAt).toLocaleDateString() : "—"}
          {/* <ChevronDown /> */}
        </Button>

        <Button
          variant="outline"
          className="
            h-10 rounded-full
            border-[#050402]/15
            bg-white px-3
            dark:border-[#F8F5EA]/20
            dark:bg-[#111]
          "
        >
          <GitBranch />
          {repository.defaultBranch || "main"} 
          {/* <ChevronDown /> */}
        </Button>
      </div>
    </section>
  );
};

export default WorkspaceHeader;
