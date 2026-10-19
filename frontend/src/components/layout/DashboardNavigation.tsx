import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardNavigation({
  repositoryId,
}: {
  repositoryId?: string;
}) {
  return <DashboardSidebar repositoryId={repositoryId} />;
}
