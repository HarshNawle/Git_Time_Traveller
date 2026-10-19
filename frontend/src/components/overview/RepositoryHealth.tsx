import { Activity } from "lucide-react";

interface RepositoryHealthProps {
  score: number | null;
  description: string;
}

export default function RepositoryHealth({
  score,
  description,
}: RepositoryHealthProps) {
  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Repository health</h3>
      </div>

      <p className="mt-4 text-3xl font-bold">
        {score === null ? "—" : `${score}/100`}
      </p>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <p className="mt-3 text-xs text-muted-foreground">
        A health score is an indicator, not a definitive measure of code quality.
      </p>
    </div>
  );
}