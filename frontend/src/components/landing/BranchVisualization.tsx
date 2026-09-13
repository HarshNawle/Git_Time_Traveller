import {
  GitBranch,
} from "lucide-react";

function BranchLabel({
  name,
  className,
  dotClassName,
}: {
  name: string;
  className: string;
  dotClassName: string;
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
        px-4
        py-2
        font-mono
        text-sm
        font-bold
        shadow-[3px_3px_0px_#09090b]
        ${className}
      `}
    >
      <span
        className={`size-2.5 rounded-full ${dotClassName}`}
      />

      {name}
    </div>
  );
}

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
      stroke="#09090b"
      strokeWidth="2"
      className="commit-node"
    />
  );
}

export function BranchVisualization() {
  return (
    <div className="relative h-[570px] w-full">

      {/* Main visualization window */}
      <div
        className="
          absolute
          left-[4%]
          top-[8%]
          h-[430px]
          w-[88%]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          shadow-[8px_8px_0px_#09090b]
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
          "
        >
          <span className="size-3 rounded-full bg-red-400 border border-black" />
          <span className="size-3 rounded-full bg-yellow-400 border border-black" />
          <span className="size-3 rounded-full bg-green-400 border border-black" />
        </div>

        {/* SVG */}
        <div className="absolute inset-x-5 bottom-5 top-16">
          <svg
            viewBox="0 0 800 350"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            {/* Background history lines */}

            <g
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
            >
              <path d="M30 80 C150 80 150 80 250 80 S400 80 740 80" />
              <path d="M30 130 C150 130 180 130 270 130 S430 130 740 130" />
              <path d="M30 180 C150 180 180 180 300 180 S500 180 740 180" />
              <path d="M30 230 C150 230 200 230 320 230 S500 230 740 230" />
              <path d="M30 280 C150 280 200 280 320 280 S500 280 740 280" />
            </g>

            {/* MAIN */}
            <path
              className="branch-path"
              d="
                M30 180
                C100 180 100 150 150 130
                C190 110 190 70 250 70
                C310 70 320 95 370 95
                C440 95 450 70 520 70
                C600 70 620 70 730 70
              "
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* FEATURE AUTH */}
            <path
              className="branch-path"
              d="
                M30 180
                C120 180 140 180 190 180
                C240 180 245 130 290 130
                C340 130 345 110 390 110
                C440 110 470 130 540 130
              "
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* FIX UI */}
            <path
              className="branch-path"
              d="
                M30 180
                C130 180 150 180 210 180
                C270 180 310 180 360 180
                C420 180 430 160 480 160
                C550 160 570 180 650 180
              "
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* DEVELOP */}
            <path
              className="branch-path"
              d="
                M30 180
                C130 180 150 180 210 180
                C300 180 310 200 380 200
                C440 200 450 230 520 230
                C570 230 600 210 680 210
              "
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* FEATURE AI */}
            <path
              className="branch-path"
              d="
                M30 180
                C130 180 150 180 210 180
                C270 180 280 250 350 250
                C410 250 420 280 480 280
                C550 280 570 250 650 250
              "
              fill="none"
              stroke="#ec4899"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Commit nodes */}
            <CommitDot cx={30} cy={180} color="#38bdf8" />
            <CommitDot cx={150} cy={130} color="#38bdf8" />
            <CommitDot cx={250} cy={70} color="#38bdf8" />
            <CommitDot cx={370} cy={95} color="#38bdf8" />

            <CommitDot cx={190} cy={180} color="#22c55e" />
            <CommitDot cx={290} cy={130} color="#a78bfa" />
            <CommitDot cx={390} cy={110} color="#a78bfa" />

            <CommitDot cx={360} cy={180} color="#22c55e" />
            <CommitDot cx={480} cy={160} color="#22c55e" />

            <CommitDot cx={380} cy={200} color="#fbbf24" />
            <CommitDot cx={520} cy={230} color="#fbbf24" />

            <CommitDot cx={350} cy={250} color="#f472b6" />
            <CommitDot cx={480} cy={280} color="#f472b6" />
          </svg>
        </div>

        <BranchLabel
          name="main"
          dotClassName="bg-blue-500"
          className="right-[15%] top-[18%]"
        />

        <BranchLabel
          name="feature/auth"
          dotClassName="bg-violet-500"
          className="right-[17%] top-[37%]"
        />

        <BranchLabel
          name="fix/ui"
          dotClassName="bg-green-500"
          className="right-[15%] top-[50%]"
        />

        <BranchLabel
          name="develop"
          dotClassName="bg-yellow-500"
          className="right-[12%] top-[67%]"
        />

        <BranchLabel
          name="feature/ai"
          dotClassName="bg-pink-500"
          className="right-[14%] bottom-[12%]"
        />

      </div>

      {/* Stats card */}
      <div
        className="
          floating-card
          absolute
          right-0
          top-0
          z-30
          w-[175px]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          p-5
          shadow-[6px_6px_0px_#09090b]
        "
      >
        <div className="flex justify-between border-b pb-3">
          <span className="text-sm">
            Commits
          </span>

          <strong className="text-xl">
            248
          </strong>
        </div>

        <div className="flex justify-between border-b py-3">
          <span className="text-sm">
            Branches
          </span>

          <strong className="text-xl">
            12
          </strong>
        </div>

        <div className="flex justify-between pt-3">
          <span className="text-sm">
            Contributors
          </span>

          <strong className="text-xl">
            8
          </strong>
        </div>
      </div>

      {/* Latest commit card */}
      <div
        className="
          floating-card
          absolute
          bottom-[5%]
          left-[-2%]
          z-30
          w-[230px]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          p-5
          shadow-[6px_6px_0px_#09090b]
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

        <p className="mt-2 text-sm text-slate-600">
          Improve UI components
        </p>

        <p className="mt-1 text-xs text-slate-500">
          2 hours ago
        </p>
      </div>

      {/* Time range */}
      <div
        className="
          floating-card
          absolute
          bottom-[-3%]
          right-[0]
          z-30
          w-[260px]
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          p-4
          shadow-[6px_6px_0px_#09090b]
        "
      >
        <div className="flex items-center gap-3">
          <GitBranch className="size-5" />

          <div>
            <p className="text-xs font-bold">
              Time Range
            </p>

            <p className="mt-1 rounded-lg border px-3 py-2 text-sm">
              Last 6 months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}