import { Badge } from "@/components/ui/badge";

type AnalysisStatusValue =
  | "PENDING"
  | "ANALYZING"
  | "COMPLETED"
  | "FAILED";

interface AnalysisStatusProps {
  status: AnalysisStatusValue;
}

export default function AnalysisStatus({
  status,
}: AnalysisStatusProps) {
  return (
    <Badge variant={status === "FAILED" ? "destructive" : "secondary"}>
      {status === "ANALYZING"
        ? "Analysis in progress"
        : status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}