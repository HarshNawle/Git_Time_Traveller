import {
  BarChart3,
  Flame,
  Lightbulb,
  Users,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface WorkspaceTabsProps {
  repositoryId: string;
}

const WorkspaceTabs = ({ repositoryId }: WorkspaceTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Timeline", path: "timeline", icon: BarChart3 },
    { name: "Heatmap", path: "heatmap", icon: Flame },
    { name: "Contributors", path: "contributors", icon: Users },
    { name: "Insights", path: "insights", icon: Lightbulb },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname.endsWith(`/${tab.path}`);

        return (
          <Button
            key={tab.path}
            variant="outline"
            onClick={() =>
              navigate(`/workspace/${repositoryId}/${tab.path}`)
            }
            className={`
              h-9 shrink-0 rounded-full px-3.5
              border-[#050402]/15
              dark:border-[#F8F5EA]/20
              ${
                isActive
                  ? "border-transparent bg-[#C3DEB1] text-[#050402] hover:bg-[#C3DEB1]"
                  : "bg-white dark:bg-[#111]"
              }
            `}
          >
            <Icon className="size-4" />
            {tab.name}
          </Button>
        );
      })}
    </div>
  );
};

export default WorkspaceTabs;
