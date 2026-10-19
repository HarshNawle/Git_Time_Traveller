import { NavLink, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Overview", path: "overview" },
  { label: "Timeline", path: "timeline" },
  { label: "Heatmap", path: "heatmap" },
  { label: "Contributors", path: "contributors" },
  { label: "Insights", path: "insights" },
];

export default function AnalyticsTabs() {
  const { repositoryId } = useParams();

  if (!repositoryId) return null;

  return (
    <nav className="flex gap-1 overflow-x-auto border-b">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={`/repositories/${repositoryId}/${tab.path}`}
          className={({ isActive }) =>
            cn(
              "whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-colors",
              isActive && "border-primary text-foreground",
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}