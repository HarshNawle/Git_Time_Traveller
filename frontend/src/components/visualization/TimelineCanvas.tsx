import {
  GitGraph,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/workspace/FilterBar";
import { TimelineControls } from "@/components/visualization/TimelineControls";

const branches = [
  {
    name: "main",
    color: "#8B5CF6",
    points: "30,240 130,240 220,180 320,150 430,100 540,90 650,90",
  },
  {
    name: "feature/auth",
    color: "#F59E0B",
    points: "30,240 140,240 240,220 340,170 450,170 560,160 670,160",
  },
  {
    name: "fix/ui",
    color: "#22C55E",
    points: "30,240 150,240 250,240 350,260 460,240 560,250 670,250",
  },
  {
    name: "develop",
    color: "#FBBF24",
    points: "30,240 160,240 260,250 350,290 460,310 570,300 680,310",
  },
  {
    name: "feature/ai",
    color: "#FB81A3",
    points: "30,240 130,240 220,280 320,310 420,350 520,350 650,340",
  },
];

const commits = [
  { x: 30, y: 240 },
  { x: 130, y: 240 },
  { x: 220, y: 180 },
  { x: 320, y: 150 },
  { x: 430, y: 100 },
  { x: 540, y: 90 },
  { x: 650, y: 90 },
  { x: 240, y: 220 },
  { x: 340, y: 170 },
  { x: 450, y: 170 },
  { x: 250, y: 240 },
  { x: 350, y: 260 },
  { x: 460, y: 240 },
  { x: 350, y: 290 },
  { x: 460, y: 310 },
  { x: 220, y: 280 },
  { x: 320, y: 310 },
  { x: 420, y: 350 },
];

const legend = [
  { name: "Main branch", color: "#8B5CF6" },
  { name: "Feature branch", color: "#F59E0B" },
  { name: "Bug fix", color: "#22C55E" },
  { name: "Development", color: "#FBBF24" },
  { name: "Other", color: "#FB81A3" },
];

export function TimelineCanvas() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-[#050402]/12
        bg-white/70
        dark:border-[#F8F5EA]/15
        dark:bg-[#0b0b0b]
      "
    >
      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
        <div
          className="
            flex size-10 items-center justify-center
            rounded-xl bg-[#C3DEB1] text-[#050402]
          "
        >
          <GitGraph className="size-5" />
        </div>

        <div className="min-w-0">
          <h3 className="font-black">Repository Timeline</h3>
          <p className="text-xs opacity-55">
            Visualize how your codebase evolved over time
          </p>
        </div>

        <FilterBar />

        <div className="hidden gap-1 lg:flex">
          <IconButton>
            <ZoomOut className="size-4" />
          </IconButton>
          <IconButton>
            <ZoomIn className="size-4" />
          </IconButton>
          <IconButton>
            <Maximize2 className="size-4" />
          </IconButton>
        </div>
      </div>

      <div className="relative h-[380px] px-4">
        <svg
          viewBox="0 0 720 400"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {[100, 180, 260, 340].map((y) => (
            <line
              key={y}
              x1="30"
              y1={y}
              x2="690"
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          ))}

          <text x="60" y="45" fontSize="13" fill="currentColor" opacity="0.45">
            2020
          </text>
          <text x="220" y="45" fontSize="13" fill="currentColor" opacity="0.45">
            2021
          </text>
          <text x="380" y="45" fontSize="13" fill="currentColor" opacity="0.45">
            2022
          </text>
          <text x="530" y="45" fontSize="13" fill="currentColor" opacity="0.45">
            2023
          </text>
          <text x="650" y="45" fontSize="13" fill="currentColor" opacity="0.45">
            2024
          </text>

          {[60, 220, 380, 530, 650].map((x) => (
            <line
              key={x}
              x1={x}
              y1="60"
              x2={x}
              y2="370"
              stroke="currentColor"
              strokeOpacity="0.08"
            />
          ))}

          {branches.map((branch) => (
            <polyline
              key={branch.name}
              points={branch.points}
              fill="none"
              stroke={branch.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {commits.map((commit, index) => (
            <circle
              key={index}
              cx={commit.x}
              cy={commit.y}
              r="6"
              fill="#F8F5EA"
              stroke={branches[index % branches.length].color}
              strokeWidth="3"
            />
          ))}
        </svg>

        <div
          className="
            absolute bottom-[28%] left-4
            rounded-xl bg-[#050402] px-3 py-2 text-white
            shadow-sm
          "
        >
          <p className="text-sm font-bold">vercel/next.js</p>
          <p className="text-xs opacity-70">12,463 commits</p>
        </div>

        <BranchLabel
          name="main"
          color="#8B5CF6"
          className="right-[10%] top-[14%]"
        />
        <BranchLabel
          name="feature/auth"
          color="#F59E0B"
          className="right-[8%] top-[34%]"
        />
        <BranchLabel
          name="fix/ui"
          color="#22C55E"
          className="right-[7%] top-[52%]"
        />
        <BranchLabel
          name="develop"
          color="#FBBF24"
          className="right-[6%] top-[66%]"
        />
        <BranchLabel
          name="feature/ai"
          color="#FB81A3"
          className="right-[8%] top-[78%]"
        />

        <div className="absolute bottom-2 left-4 space-y-1 text-[11px]">
          {legend.map((item) => (
            <div key={item.name} className="flex items-center gap-2 opacity-70">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <TimelineControls />
      </div>
    </div>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="
        size-8 rounded-full
        border-[#050402]/15
        bg-white
        dark:border-[#F8F5EA]/20
        dark:bg-[#111]
      "
    >
      {children}
    </Button>
  );
}

function BranchLabel({
  name,
  color,
  className,
}: {
  name: string;
  color: string;
  className: string;
}) {
  return (
    <div
      className={`
        absolute ${className}
        flex items-center gap-1.5
        rounded-full
        border border-[#050402]/10
        bg-white px-2.5 py-1
        text-xs font-semibold
        shadow-sm
        dark:border-[#F8F5EA]/20
        dark:bg-[#111111]
      `}
    >
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {name}
    </div>
  );
}
