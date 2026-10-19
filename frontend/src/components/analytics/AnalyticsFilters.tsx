import { Input } from "@/components/ui/input";

interface AnalyticsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function AnalyticsFilters({
  search,
  onSearchChange,
}: AnalyticsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Filter files or commits..."
        className="max-w-sm"
      />
    </div>
  );
}