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

  const go = (path: string) => {
    navigate(`/workspace/${repositoryId}/${path}`);
  };

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
      <div className="px-1">
        <p className="text-[11px] font-mono font-bold uppercase tracking-wide opacity-45">
          Repository
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div
            className="
              flex size-10 items-center justify-center
              rounded-full bg-[#050402] text-white
              dark:bg-white dark:text-black
            "
          >
            <GitBranch className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-mono font-bold">vercel/next.js</p>
            <p className="truncate text-xs font-mono opacity-55">
              A React framework for the web
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
          <InfoRow label="Commits" value="12,463" />
          <InfoRow label="Contributors" value="428" />
          <InfoRow label="Branches" value="42" />
          <InfoRow label="Created" value="Oct 25, 2016" />
          <InfoRow label="Language" value="TypeScript" />
        </div>
      </div>

      {/* <button
        onClick={() => navigate("/")}
        className="
          mt-auto flex items-center gap-2
          px-1 py-2 text-sm font-medium 
          opacity-60 transition hover:opacity-100
        "
      >
        <ArrowLeft className="size-4" />
        <p className="font-mono">Back to Home</p>
      </button> */}
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
  value: string;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="opacity-55">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
