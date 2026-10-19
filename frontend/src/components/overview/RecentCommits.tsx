import { GitCommitHorizontal } from "lucide-react";

interface RecentCommit {
  hash: string;
  message: string;
  authorName: string;
  committedAt: string;
}

interface RecentCommitsProps {
  commits: RecentCommit[];
}

export default function RecentCommits({
  commits,
}: RecentCommitsProps) {
  return (
    <div className="rounded-xl border p-5">
      <h3 className="font-semibold">Recent commits</h3>

      <div className="mt-4 space-y-4">
        {commits.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No commits available.
          </p>
        ) : (
          commits.map((commit) => (
            <div key={commit.hash} className="flex gap-3">
              <GitCommitHorizontal className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />

              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium">
                  {commit.message || "No commit message"}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {commit.authorName} ·{" "}
                  {new Date(commit.committedAt).toLocaleDateString()}
                </p>
              </div>

              <code className="shrink-0 text-xs text-muted-foreground">
                {commit.hash.slice(0, 7)}
              </code>
            </div>
          ))
        )}
      </div>
    </div>
  );
}