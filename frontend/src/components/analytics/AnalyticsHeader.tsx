import { GitBranch } from "lucide-react";

interface AnalyticsHeaderProps {
  repositoryName: string;
  description?: string | null;
}

export default function AnalyticsHeader({
  repositoryName,
  description,
}: AnalyticsHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-2xl font-bold">{repositoryName}</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        {description || "Explore the development history of this repository."}
      </p>
    </div>
  );
}