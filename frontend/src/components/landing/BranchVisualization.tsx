import {
  CalendarDays,
  // GitBranch,
} from "lucide-react";

function CommitDot({
  cx,
  cy,
  color,
}: {
  cx: number;
  cy: number;
  color: string;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r="7"
      fill={color}
      stroke="#050402"
      strokeWidth="2"
      className="commit-node"
    />
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
        absolute
        z-20
        flex
        items-center
        gap-2
        rounded-xl
        border-2
        border-black
        bg-white
        px-3
        py-1.5
        font-mono
        text-xs
        font-bold
        text-black
        shadow-[3px_3px_0px_#050402]

        dark:border-white
        dark:bg-[#151515]
        dark:text-white
        dark:shadow-[3px_3px_0px_#000]

        ${className}
      `}
    >
      <span
        className="size-2.5 rounded-full"
        style={{
          backgroundColor: color,
        }}
      />

      {name}
    </div>
  );
}

function Stat({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between

        ${
          !last
            ? "mb-2 border-b border-slate-300 pb-2 dark:border-slate-700"
            : ""
        }
      `}
    >
      <span className="text-xs">
        {label}
      </span>

      <strong className="text-lg">
        {value}
      </strong>
    </div>
  );
}

export function BranchVisualization() {
  return (
    <div className="relative h-[570px] w-full">

      {/* Git visualization */}

      <div
        className="
          absolute
          left-[2%]
          top-[8%]
          h-[425px]
          w-[89%]
          overflow-hidden
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          shadow-[8px_8px_0px_#050402]

          dark:border-white
          dark:bg-[#101010]
          dark:shadow-[8px_8px_0px_#000]
        "
      >
        {/* Browser header */}

        <div
          className="
            flex
            h-12
            items-center
            gap-2
            border-b-2
            border-slate-200
            px-5

            dark:border-slate-700
          "
        >
          <span className="size-3 rounded-full border border-black bg-red-400" />
          <span className="size-3 rounded-full border border-black bg-yellow-400" />
          <span className="size-3 rounded-full border border-black bg-green-400" />
        </div>

        {/* Graph */}

        <div className="absolute inset-x-5 bottom-5 top-16">
          <svg
            viewBox="0 0 800 350"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            {/* Background lines */}

            <g
              fill="none"
              stroke="var(--grid)"
              strokeWidth="2"
            >
              <path d="M30 80 C150 80 180 80 300 80 S500 80 770 80" />
              <path d="M30 130 C150 130 180 130 300 130 S500 130 770 130" />
              <path d="M30 180 C150 180 180 180 300 180 S500 180 770 180" />
              <path d="M30 230 C150 230 200 230 320 230 S500 230 770 230" />
              <path d="M30 280 C150 280 200 280 320 280 S500 280 770 280" />
            </g>

            {/* MAIN */}

            <path
              className="branch-path"
              d="
                M30 180
                C100 180 110 155 150 125
                C190 95 190 65 250 65
                C310 65 320 90 375 90
                C440 90 455 65 520 65
                C600 65 650 65 750 65
              "
              fill="none"
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* FEATURE AUTH */}

            <path
              className="branch-path"
              d="
                M30 180
                C120 180 140 180 190 180
                C240 180 250 130 300 130
                C350 130 360 110 405 110
                C460 110 480 130 550 130
              "
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* FIX UI */}

            <path
              className="branch-path"
              d="
                M30 180
                C120 180 150 180 220 180
                C280 180 320 180 370 180
                C430 180 450 160 500 160
                C550 160 590 180 660 180
              "
              fill="none"
              stroke="#22c55e"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* DEVELOP */}

            <path
              className="branch-path"
              d="
                M30 180
                C120 180 160 180 220 180
                C290 180 310 200 380 200
                C440 200 450 230 520 230
                C580 230 620 210 690 210
              "
              fill="none"
              stroke="#f59e0b"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* FEATURE AI */}

            <path
              className="branch-path"
              d="
                M30 180
                C120 180 160 180 220 180
                C280 180 290 250 350 250
                C410 250 430 280 490 280
                C550 280 590 250 670 250
              "
              fill="none"
              stroke="#ec4899"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Commit nodes */}

            <CommitDot cx={30} cy={180} color="#38bdf8" />
            <CommitDot cx={150} cy={125} color="#38bdf8" />
            <CommitDot cx={250} cy={65} color="#38bdf8" />
            <CommitDot cx={375} cy={90} color="#38bdf8" />

            <CommitDot cx={190} cy={180} color="#22c55e" />
            <CommitDot cx={300} cy={130} color="#a78bfa" />
            <CommitDot cx={405} cy={110} color="#a78bfa" />

            <CommitDot cx={370} cy={180} color="#22c55e" />
            <CommitDot cx={500} cy={160} color="#22c55e" />

            <CommitDot cx={380} cy={200} color="#fbbf24" />
            <CommitDot cx={520} cy={230} color="#fbbf24" />

            <CommitDot cx={350} cy={250} color="#f472b6" />
            <CommitDot cx={490} cy={280} color="#f472b6" />
          </svg>
        </div>

        {/* Branch labels */}

        <BranchLabel
          name="main"
          color="#2563eb"
          className="right-[14%] top-[17%]"
        />

        <BranchLabel
          name="feature/auth"
          color="#8b5cf6"
          className="right-[15%] top-[36%]"
        />

        <BranchLabel
          name="fix/ui"
          color="#22c55e"
          className="right-[14%] top-[49%]"
        />

        <BranchLabel
          name="develop"
          color="#f59e0b"
          className="right-[10%] top-[65%]"
        />

        <BranchLabel
          name="feature/ai"
          color="#ec4899"
          className="right-[13%] bottom-[12%]"
        />
      </div>

      {/* Stats */}

      <div
        className="
          floating-card
          absolute
          right-[-1%]
          top-0
          z-30
          w-[165px]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          p-4
          text-black
          shadow-[6px_6px_0px_#050402]

          dark:border-white
          dark:bg-[#151515]
          dark:text-white
          dark:shadow-[6px_6px_0px_#000]
        "
      >
        <Stat label="Commits" value="248" />
        <Stat label="Branches" value="12" />
        <Stat
          label="Contributors"
          value="8"
          last
        />
      </div>

      {/* Latest Commit */}

      <div
        className="
          floating-card
          absolute
          bottom-[5%]
          left-[-1%]
          z-40
          w-[230px]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          p-5
          text-black
          shadow-[6px_6px_0px_#050402]

          dark:border-white
          dark:bg-[#151515]
          dark:text-white
          dark:shadow-[6px_6px_0px_#000]
        "
      >
        <p className="text-xs font-bold">
          Latest Commit
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="size-4 rounded-full border-2 border-black bg-green-400" />

          <strong className="font-mono">
            a1b2c3d
          </strong>
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Improve UI components
        </p>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          2 hours ago
        </p>
      </div>

      {/* Time Range */}

      <div
        className="
          floating-card
          absolute
          bottom-[-2%]
          right-[-1%]
          z-40
          w-[250px]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          p-4
          text-black
          shadow-[6px_6px_0px_#050402]

          dark:border-white
          dark:bg-[#151515]
          dark:text-white
          dark:shadow-[6px_6px_0px_#000]
        "
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="size-5" />

          <div className="flex-1">
            <p className="text-xs font-bold">
              Time Range
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                justify-between
                rounded-lg
                border-2
                border-slate-300
                px-3
                py-2
                text-sm

                dark:border-slate-600
              "
            >
              Last 6 months

              <span>⌄</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}