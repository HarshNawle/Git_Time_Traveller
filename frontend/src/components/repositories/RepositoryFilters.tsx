import { LayoutGrid, List, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type RepositorySort = "updated" | "stars" | "name";
export type RepositoryView = "list" | "grid";

interface RepositoryFiltersProps {
  sort: RepositorySort;
  view: RepositoryView;
  onSortChange: (value: RepositorySort) => void;
  onViewChange: (value: RepositoryView) => void;
}

export default function RepositoryFilters({
  sort,
  view,
  onSortChange,
  onViewChange,
}: RepositoryFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={sort}
        onValueChange={(value) => onSortChange(value as RepositorySort)}
      >
        <SelectTrigger className="h-10 w-[160px] rounded-full border border-[#050402]/12 bg-white shadow-none dark:border-[#F8F5EA]/15 dark:bg-[#111111]">
          <ArrowUpDown className="size-3.5" />
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated">Recently Updated</SelectItem>
          <SelectItem value="stars">Most Stars</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex rounded-full border border-[#050402]/12 bg-white p-1 dark:border-[#F8F5EA]/15 dark:bg-[#111111]">
        <button
          type="button"
          onClick={() => onViewChange("list")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
            view === "list"
              ? "bg-[#EDE4FF] text-[#050402]"
              : "text-[#050402]/55 hover:text-[#050402] dark:text-[#F8F5EA]/55",
          )}
        >
          <List className="size-3.5" />
          List
        </button>
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
            view === "grid"
              ? "bg-[#EDE4FF] text-[#050402]"
              : "text-[#050402]/55 hover:text-[#050402] dark:text-[#F8F5EA]/55",
          )}
        >
          <LayoutGrid className="size-3.5" />
          Grid
        </button>
      </div>
    </div>
  );
}
