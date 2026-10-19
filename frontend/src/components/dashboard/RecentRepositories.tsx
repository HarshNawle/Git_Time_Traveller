import { Link } from "react-router-dom";
import { ArrowRight, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface RecentRepository {
  id: string;
  fullName: string;
  description?: string | null;
  status: "PENDING" | "ANALYZING" | "COMPLETED" | "FAILED";
  lastAnalyzedAt?: string | null;
}

interface RecentRepositoriesProps {
  repositories: RecentRepository[];
}

export default function RecentRepositories({
  repositories,
}: RecentRepositoriesProps) {
  return (
    <div className="space-y-4">
      {repositories.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No repositories analyzed yet.
        </p>
      ) : (
        repositories.map((repository) => (
          <div
            key={repository.id}
            className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <GitBranch className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-semibold">
                  {repository.fullName}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {repository.description || "No description available"}
                </p>

                {repository.lastAnalyzedAt && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last analyzed:{" "}
                    {new Date(repository.lastAnalyzedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={
                  repository.status === "FAILED" ? "destructive" : "secondary"
                }
              >
                {repository.status.toLowerCase()}
              </Badge>

              <Button size="sm" variant="outline" asChild>
                <Link
                  to={`/repositories/${repository.id}/overview`}
                  aria-label={`Open ${repository.fullName}`}
                >
                  Open <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}