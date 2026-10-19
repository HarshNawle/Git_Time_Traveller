import { GitCommitHorizontal, Users, FileCode2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewStatsProps {
  totalCommits: number;
  totalContributors: number;
  totalFiles: number;
  totalAdditions: number;
}

export default function OverviewStats({
  totalCommits,
  totalContributors,
  totalFiles,
  totalAdditions,
}: OverviewStatsProps) {
  const stats = [
    { label: "Commits", value: totalCommits, icon: GitCommitHorizontal },
    { label: "Contributors", value: totalContributors, icon: Users },
    { label: "Files changed", value: totalFiles, icon: FileCode2 },
    { label: "Lines added", value: totalAdditions, icon: Plus },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-bold">
                {value.toLocaleString()}
              </p>
            </div>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}