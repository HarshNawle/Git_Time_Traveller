import { ChevronDown, Play, Pause } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTimelineStore } from "@/stores/timeline-store";

export function TimelineControls() {
  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const playbackSpeed = useTimelineStore((state) => state.playbackSpeed);
  const setPlaying = useTimelineStore((state) => state.setPlaying);
  const setPlaybackSpeed = useTimelineStore((state) => state.setPlaybackSpeed);

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={() => setPlaying(!isPlaying)}
        size="icon"
        className="
          size-10 rounded-full
          bg-[#050402] text-white
          hover:bg-[#050402]/90
          dark:bg-[#F8F5EA]
          dark:text-[#050402]
        "
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>

      <button
        type="button"
        onClick={() =>
          setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)
        }
        className="
          flex h-8 items-center gap-1
          rounded-full px-2
          text-sm font-semibold
          opacity-70 hover:opacity-100
        "
      >
        {playbackSpeed}x
        <ChevronDown className="size-3.5" />
      </button>

      <div className="relative mx-2 h-2 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(90deg,#8B5CF6_0%,#8B5CF6_22%,#F59E0B_22%,#F59E0B_40%,#22C55E_40%,#22C55E_58%,#FBBF24_58%,#FBBF24_76%,#FB81A3_76%,#FB81A3_100%)]
          "
        />
      </div>

      <span className="hidden text-xs opacity-50 sm:block">
        Jan 1, 2020
      </span>
      <span className="text-xs opacity-50">Dec 31, 2024</span>
    </div>
  );
}
