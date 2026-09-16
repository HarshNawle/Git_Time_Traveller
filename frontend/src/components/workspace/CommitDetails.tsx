import {
  ExternalLink,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const cardClass = `
  rounded-2xl
  border border-[#050402]/12
  bg-white/80
  p-4
  dark:border-[#F8F5EA]/15
  dark:bg-[#0b0b0b]
`;

export function CommitDetails() {
  return (
    <div className="space-y-4">
      <div className={cardClass}>
        <h3 className="font-black">Commit Details</h3>

        <div className="mt-3 flex items-center gap-3">
          <span className="font-mono text-sm font-semibold">a3f9c12</span>
          <span className="text-xs opacity-50">Mar 12, 2024 10:24 AM</span>
        </div>

        <p className="mt-3 font-bold">feat: add server actions support</p>

        <div className="mt-3 flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-[#C3DEB1] text-[#050402]">
              LR
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-bold">leerob</p>
            <p className="text-xs opacity-50">@leerob</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 border-t border-[#050402]/10 pt-4 text-sm">
          <FileChange
            name="app/actions.ts"
            additions="+142"
            deletions="-23"
          />
          <FileChange
            name="packages/next/src/server.ts"
            additions="+56"
            deletions="-12"
          />
          <FileChange
            name="docs/server-actions.md"
            additions="+34"
            deletions="-5"
          />
        </div>

        <Button
          variant="outline"
          className="
            mt-4 h-9 w-full rounded-full
            border-[#050402]/15
          "
        >
          View on GitHub
          <ExternalLink />
        </Button>
      </div>

      <div className={cardClass}>
        <h3 className="font-black">File Stats</h3>
        <p className="mt-2 text-sm font-semibold">packages/next/src</p>

        <div className="mt-3 flex h-14 items-end gap-1">
          {[18, 28, 22, 40, 32, 48, 36, 52, 44, 38, 60, 46].map(
            (height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t bg-[#C9B6FF]"
                style={{ height: `${height}%` }}
              />
            )
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat value="1,892" label="Commits" />
          <Stat value="48" label="Authors" />
          <Stat value="+12.4k" label="Lines added" positive />
          <Stat value="-4.2k" label="Lines deleted" negative />
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-sky-500" />
            <h3 className="font-black">AI Insights</h3>
          </div>
          <button className="text-xs font-semibold text-emerald-600">
            View all →
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-red-500" />
              <p className="font-bold">High Churn Directory</p>
            </div>
            <p className="mt-1 text-sm opacity-60">
              packages/next/src has 3.2x more changes than the
              repository average.
            </p>
            <div className="mt-2 flex gap-2">
              <Badge className="rounded-full bg-red-100 text-red-700">
                High Risk
              </Badge>
              <Badge className="rounded-full bg-[#EEEAF8] text-[#050402]">
                Refactor Suggested
              </Badge>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600" />
              <p className="font-bold">Growing Complexity</p>
            </div>
            <p className="mt-1 text-sm opacity-60">
              File size has increased by 400% over the last year
              without significant refactoring.
            </p>
            <div className="mt-2 flex gap-2">
              <Badge className="rounded-full bg-amber-100 text-amber-800">
                Medium Risk
              </Badge>
              <Badge className="rounded-full bg-[#EEEAF8] text-[#050402]">
                Monitor
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileChange({
  name,
  additions,
  deletions,
}: {
  name: string;
  additions: string;
  deletions: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full bg-emerald-500" />
      <span className="flex-1 truncate">{name}</span>
      <span className="text-emerald-600">{additions}</span>
      <span className="text-red-500">{deletions}</span>
    </div>
  );
}

function Stat({
  value,
  label,
  positive,
  negative,
}: {
  value: string;
  label: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div>
      <p
        className={`
          text-xl font-black
          ${positive ? "text-emerald-600" : negative ? "text-red-500" : ""}
        `}
      >
        {value}
      </p>
      <p className="text-xs opacity-50">{label}</p>
    </div>
  );
}
