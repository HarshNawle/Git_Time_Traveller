import {
  CalendarDays,
  ChevronDown,
  GitBranch,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tags = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Web Framework",
];

const WorkspaceHeader = () => {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight">
            vercel/next.js
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
            112k
          </Badge>
        </div>

        <p className="mt-1 text-sm opacity-55">
          A React framework for the web, built for the Vercel platform.
        </p>

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
          Jan 1, 2020 – Dec 31, 2024
          <ChevronDown />
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
          main
          <ChevronDown />
        </Button>
      </div>
    </section>
  );
};

export default WorkspaceHeader;
