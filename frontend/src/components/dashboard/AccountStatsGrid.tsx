import { CalendarDays, Code2, FileText, Users } from "lucide-react";
import { TrendingUp } from "lucide-react";
import type { DashboardStats } from "@/types/dashboard";

interface AccountStatsGridProps {
  stats: DashboardStats;
  loading?: boolean;
}

const statConfig = [
  {
    key: "totalRepositories" as const,
    label: "Total Repositories",
    changeKey: "repositoryChange" as const,
    icon: CalendarDays,
    iconClass: "bg-[#F4D7E8] text-[#C45C88]",
  },
  {
    key: "totalCommits" as const,
    label: "Total Commits",
    changeKey: "commitChange" as const,
    icon: Code2,
    iconClass: "bg-[#D8EFC4] text-[#5B8A2B]",
  },
  {
    key: "contributors" as const,
    label: "Contributors",
    changeKey: "contributorChange" as const,
    icon: Users,
    iconClass: "bg-[#D7E7FB] text-[#3B78C8]",
  },
  {
    key: "totalLinesChanged" as const,
    label: "Total Lines Changed",
    changeKey: "linesChange" as const,
    icon: FileText,
    iconClass: "bg-[#F8E2B8] text-[#C07A16]",
  },
];

export default function AccountStatsGrid({
  stats,
  loading = false,
}: AccountStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="rounded-2xl border border-[#050402]/8 bg-white px-5 py-4 dark:border-[#F8F5EA]/10 dark:bg-[#111111]"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
              >
                <Icon className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-[#050402]/55 dark:text-[#F8F5EA]/55">
                  {item.label}
                </p>

                {loading ? (
                  <div className="mt-2 h-8 w-20 animate-pulse rounded bg-muted" />
                ) : (
                  <p className="mt-1 text-3xl font-semibold tracking-tight">
                    {stats[item.key].toLocaleString("en-US")}
                  </p>
                )}

                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <TrendingUp className="size-3" />
                  {stats[item.changeKey]}% from last month
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
