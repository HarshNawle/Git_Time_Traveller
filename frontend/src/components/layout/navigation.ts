import {
  BarChart3,
  CalendarClock,
  Flame,
  FolderGit2,
  Lightbulb,
  Search,
  Settings,
  Users,
} from "lucide-react";

export const dashboardNav = [
  { label: "My Repositories", to: "/dashboard", icon: FolderGit2, end: true },
  { label: "Explore", to: "/explore", icon: Search, end: false },
  { label: "Settings", to: "/settings", icon: Settings, end: false },
] as const;

export const analyticsNav = [
  { label: "Overview", path: "timeline", icon: BarChart3 },
  { label: "Timeline", path: "timeline", icon: CalendarClock },
  { label: "Heatmap", path: "heatmap", icon: Flame },
  { label: "Contributors", path: "contributors", icon: Users },
  { label: "Insights", path: "insights", icon: Lightbulb },
] as const;
