import { FolderGit2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface RepositoryEmptyStateProps {
  title?: string;
  description?: string;
}

export default function RepositoryEmptyState({
  title = "No repositories found",
  description = "Start by exploring a GitHub repository.",
}: RepositoryEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
      <FolderGit2 className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      <Button asChild className="mt-5">
        <Link to="/explore">
          <Plus className="mr-2 h-4 w-4" />
          Explore repositories
        </Link>
      </Button>
    </div>
  );
}