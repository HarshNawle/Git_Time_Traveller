import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface RepositorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RepositorySearch({
  value,
  onChange,
}: RepositorySearchProps) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#050402]/40 dark:text-[#F8F5EA]/40" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Filter repositories..."
        aria-label="Filter repositories"
        className="h-10 rounded-full border border-[#050402]/12 bg-white pl-9 shadow-none dark:border-[#F8F5EA]/15 dark:bg-[#111111]"
      />
    </div>
  );
}
