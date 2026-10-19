import RepositoryCard from "./RepositoryCard";
import RepositoryEmptyState from "@/components/repositories/RepositoryEmptyState";
import type { DashboardRepository } from "@/types/dashboard";

const sparklineColors = ["#7C6CF0", "#62B35A", "#E278A0", "#8B7CF6", "#4C9BE8"];

interface RepositoryGridProps {
  repositories: DashboardRepository[];
}

export default function RepositoryGrid({ repositories }: RepositoryGridProps) {
  if (repositories.length === 0) {
    return <RepositoryEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {repositories.map((repository, index) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          sparklineColor={sparklineColors[index % sparklineColors.length]}
        />
      ))}
    </div>
  );
}
