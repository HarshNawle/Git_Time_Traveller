import { Clock, GitBranch, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ActivityItem {
  id: string;
  repositoryName: string;
  action: string;
  timestamp: string;
  status: "completed" | "failed" | "processing";
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <Clock className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <h3 className="font-semibold">No recent activity</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Analyze a repository to see your activity here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon =
          activity.status === "completed"
            ? CheckCircle2
            : activity.status === "failed"
              ? XCircle
              : GitBranch;

        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 border-b pb-4 last:border-0"
          >
            <div className="rounded-lg bg-muted p-2">
              <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {activity.repositoryName}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {activity.action}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>

            <Badge
              variant={
                activity.status === "failed" ? "destructive" : "secondary"
              }
            >
              {activity.status}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}