import { NavLink } from "react-router-dom";
import { analyticsNav, dashboardNav } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  repositoryId?: string;
}

export default function DashboardSidebar({
  repositoryId,
}: DashboardSidebarProps) {
  const analyticsId = repositoryId ?? "demo";

  return (
    <aside
      className="
        sticky top-[85px]
        rounded-2xl
        hidden h-[calc(100vh-72px)] w-[240px] shrink-0
        flex-col
        border border-[#050402]/10
        bg-[#F8F5EA]
        p-4
        lg:flex
        dark:border-[#F8F5EA]/10
        dark:bg-[#080808]
      "
    >
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#050402]/40 dark:text-[#F8F5EA]/40">
        Dashboard
      </p>

      <nav className="mt-3 space-y-1">
        {dashboardNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-[#EDE4FF] text-[#050402]"
                  : "text-[#050402]/70 hover:bg-black/5 dark:text-[#F8F5EA]/70 dark:hover:bg-white/8",
              )
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <p className="mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#050402]/40 dark:text-[#F8F5EA]/40">
        Analytics
      </p>

      <nav className="mt-3 space-y-1">
        {analyticsNav.map((item) => (
          <NavLink
            key={item.label}
            to={`/workspace/${analyticsId}/${item.path}`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-[#EDE4FF] text-[#050402]"
                  : "text-[#050402]/70 hover:bg-black/5 dark:text-[#F8F5EA]/70 dark:hover:bg-white/8",
              )
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
