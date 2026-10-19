import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GlobalSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function GlobalSearch({
  value,
  onChange,
  placeholder = "Search your repositories...",
}: GlobalSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#050402]/45 dark:text-[#F8F5EA]/45" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-11 rounded-full border border-[#050402]/12 bg-white pl-11 pr-4 text-sm shadow-none placeholder:text-[#050402]/40 dark:border-[#F8F5EA]/15 dark:bg-[#111111] dark:placeholder:text-[#F8F5EA]/40"
      />
    </div>
  );
}
