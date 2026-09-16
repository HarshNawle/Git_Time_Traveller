import { useState } from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";

const views = ["Tree", "List", "Compact"] as const;

export function FilterBar() {
  const [view, setView] = useState<(typeof views)[number]>("Tree");

  return (
    <div className="ml-auto flex items-center gap-2">
      <div className="hidden items-center rounded-full bg-[#F3F0E8] p-1 md:flex dark:bg-white/10">
        {views.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setView(item)}
            className={`
              rounded-full px-3 py-1 text-xs font-semibold
              ${
                item === view
                  ? "bg-[#D9C7FF] text-[#050402]"
                  : "opacity-60 hover:opacity-100"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        className="
          h-8 rounded-full
          border-[#050402]/15
          bg-white px-3
          dark:border-[#F8F5EA]/20
          dark:bg-[#111]
        "
      >
        <Filter />
        Filters
      </Button>
    </div>
  );
}
