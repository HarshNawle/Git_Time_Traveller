interface CommitActivityPoint {
    label: string;
    commits: number;
  }
  
  interface CommitActivityChartProps {
    data: CommitActivityPoint[];
  }
  
  export default function CommitActivityChart({
    data,
  }: CommitActivityChartProps) {
    const maxCommits = Math.max(...data.map((point) => point.commits), 1);
  
    return (
      <div className="rounded-xl border p-5">
        <h3 className="font-semibold">Commit activity</h3>
  
        {data.length === 0 ? (
          <p className="py-8 text-sm text-muted-foreground">
            No activity data available.
          </p>
        ) : (
          <div className="mt-6 flex h-48 items-end gap-2">
            {data.map((point) => (
              <div
                key={point.label}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                title={`${point.label}: ${point.commits} commits`}
              >
                <div
                  className="w-full rounded-t bg-primary/80 transition-all"
                  style={{
                    height: `${Math.max((point.commits / maxCommits) * 100, 2)}%`,
                  }}
                />
                <span className="truncate text-xs text-muted-foreground">
                  {point.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }