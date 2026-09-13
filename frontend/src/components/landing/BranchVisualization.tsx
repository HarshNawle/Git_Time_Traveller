import { GitBranch } from "lucide-react";

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
    <div className="absolute inset-0 overflow-visible">

      {/* ========================================= */}
      {/* DARK DIAGONAL BACKGROUND */}
      {/* ========================================= */}

      <div
        className="
          absolute
          -right-[30%]
          -top-[18%]
          h-[125%]
          w-[115%]
          bg-[#171C22]
          [clip-path:polygon(38%_0%,100%_0%,100%_100%,0%_100%)]
        "
      />

      {/* ========================================= */}
      {/* GIT VISUALIZATION */}
      {/* ========================================= */}

      <div
        className="
          absolute
          left-[4%]
          top-[13%]
          h-[430px]
          w-[88%]
          overflow-hidden
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          shadow-[8px_8px_0px_#050505]
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
          <span className="size-3 rounded-full border border-black bg-red-400" />

          <span className="size-3 rounded-full border border-black bg-yellow-400" />

          <span className="size-3 rounded-full border border-black bg-green-400" />
        </div>


        {/* ========================================= */}
        {/* GIT GRAPH */}
        {/* ========================================= */}

        <div className="absolute inset-x-5 bottom-5 top-16">

          <svg
            viewBox="0 0 800 350"
            className="h-full w-full"
            preserveAspectRatio="none"
          >

            {/* Background history lines */}

            <g
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
              opacity="0.7"
            >
              <path
                d="
                  M20 70
                  C160 70 180 70 300 70
                  S520 70 780 70
                "
              />

              <path
                d="
                  M20 120
                  C140 120 200 120 320 120
                  S560 120 780 120
                "
              />

              <path
                d="
                  M20 180
                  C150 180 220 180 340 180
                  S580 180 780 180
                "
              />

              <path
                d="
                  M20 235
                  C160 235 220 235 360 235
                  S600 235 780 235
                "
              />

              <path
                d="
                  M20 290
                  C160 290 220 290 350 290
                  S580 290 780 290
                "
              />
            </g>


            {/* ===================================== */}
            {/* MAIN BRANCH */}
            {/* ===================================== */}

            <path
              className="branch-path"
              d="
                M30 180

                C90 180
                110 160
                150 125

                C185 95
                190 65
                250 65

                C310 65
                325 90
                375 90

                C440 90
                455 65
                520 65

                C600 65
                650 65
                750 65
              "
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
            />


            {/* ===================================== */}
            {/* FEATURE AUTH */}
            {/* ===================================== */}

            <path
              className="branch-path"
              d="
                M30 180

                C110 180
                140 180
                190 180

                C240 180
                250 130
                300 130

                C350 130
                360 110
                405 110

                C460 110
                480 130
                545 130
              "
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="5"
              strokeLinecap="round"
            />


            {/* ===================================== */}
            {/* FIX UI */}
            {/* ===================================== */}

            <path
              className="branch-path"
              d="
                M30 180

                C120 180
                160 180
                220 180

                C280 180
                320 180
                370 180

                C430 180
                450 160
                500 160

                C550 160
                590 180
                660 180
              "
              fill="none"
              stroke="#22C55E"
              strokeWidth="5"
              strokeLinecap="round"
            />


            {/* ===================================== */}
            {/* DEVELOP */}
            {/* ===================================== */}

            <path
              className="branch-path"
              d="
                M30 180

                C120 180
                160 180
                220 180

                C290 180
                310 200
                380 200

                C440 200
                450 230
                520 230

                C580 230
                620 210
                690 210
              "
              fill="none"
              stroke="#F59E0B"
              strokeWidth="5"
              strokeLinecap="round"
            />


            {/* ===================================== */}
            {/* FEATURE AI */}
            {/* ===================================== */}

            <path
              className="branch-path"
              d="
                M30 180

                C120 180
                160 180
                220 180

                C280 180
                290 250
                350 250

                C410 250
                430 280
                490 280

                C550 280
                590 250
                670 250
              "
              fill="none"
              stroke="#EC4899"
              strokeWidth="5"
              strokeLinecap="round"
            />


            {/* ===================================== */}
            {/* COMMIT NODES */}
            {/* ===================================== */}

            <CommitDot
              cx={30}
              cy={180}
              color="#38BDF8"
            />

            <CommitDot
              cx={150}
              cy={130}
              color="#38BDF8"
            />

            <CommitDot
              cx={250}
              cy={70}
              color="#38BDF8"
            />

            <CommitDot
              cx={370}
              cy={95}
              color="#38BDF8"
            />


            <CommitDot
              cx={190}
              cy={180}
              color="#22C55E"
            />

            <CommitDot
              cx={290}
              cy={130}
              color="#A78BFA"
            />

            <CommitDot
              cx={390}
              cy={110}
              color="#A78BFA"
            />


            <CommitDot
              cx={360}
              cy={180}
              color="#22C55E"
            />

            <CommitDot
              cx={480}
              cy={160}
              color="#22C55E"
            />


            <CommitDot
              cx={380}
              cy={200}
              color="#FBBF24"
            />

            <CommitDot
              cx={520}
              cy={230}
              color="#FBBF24"
            />


            <CommitDot
              cx={350}
              cy={250}
              color="#F472B6"
            />

            <CommitDot
              cx={480}
              cy={280}
              color="#F472B6"
            />

          </svg>

        </div>


        {/* ========================================= */}
        {/* BRANCH LABELS */}
        {/* ========================================= */}

        <BranchLabel
          name="main"
          dotClassName="bg-blue-500"
          className="
            right-[15%]
            top-[18%]
          "
        />

        <BranchLabel
          name="feature/auth"
          dotClassName="bg-violet-500"
          className="
            right-[17%]
            top-[37%]
          "
        />

        <BranchLabel
          name="fix/ui"
          dotClassName="bg-green-500"
          className="
            right-[15%]
            top-[50%]
          "
        />

        <BranchLabel
          name="develop"
          dotClassName="bg-yellow-500"
          className="
            right-[12%]
            top-[67%]
          "
        />

        <BranchLabel
          name="feature/ai"
          dotClassName="bg-pink-500"
          className="
            right-[14%]
            bottom-[12%]
          "
        />

      </div>


      {/* ========================================= */}
      {/* STATS CARD */}
      {/* ========================================= */}

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


      {/* ========================================= */}
      {/* LATEST COMMIT */}
      {/* ========================================= */}

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

          <span
            className="
              size-4
              rounded-full
              border-2
              border-black
              bg-green-400
            "
          />

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


      {/* ========================================= */}
      {/* TIME RANGE */}
      {/* ========================================= */}

      <div
        className="
          floating-card
          absolute
          bottom-[-3%]
          right-0
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

            <p
              className="
                mt-1
                rounded-lg
                border-2
                border-slate-300
                px-3
                py-2
                text-sm
              "
            >
              Last 6 months
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}