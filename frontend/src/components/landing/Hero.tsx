import { BranchVisualization } from "./BranchVisualization";
import { LocalRepoButton } from "./LocalRepoButton";
import { RepoInput } from "./RepoInput";
import { Header } from "@/components/layout/Header";

export function Hero() {
  return (
    <section
      id="explore"
      className="
        relative
        min-h-[720px]
        overflow-hidden
        border-b-2
        border-black
        pb-16

        dark:border-white
      "
    >
      {/* Grid */}

      <div
        className="
          grid-background
          pointer-events-none
          absolute
          inset-0
          opacity-50
        "
      />

      {/* Dark diagonal */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[-20%]
          hidden
          h-[125%]
          w-[58%]
          bg-[#20252a]
          [clip-path:polygon(30%_0%,100%_0%,100%_100%,0%_100%)]

          dark:block
          dark:bg-[#0c0c0c]

          lg:block
        "
      />

      {/* Navbar at top of section */}
      <Header />

      <div
        className="
          relative
          z-10
          mx-auto
          mt-6
          grid
          max-w-[1540px]
          items-center
          gap-6
          px-5

          lg:grid-cols-[47%_53%]
        "
      >
        {/* LEFT */}

        <div className="max-w-[720px]">
          {/* Pills */}

          <div className="mb-7 flex flex-wrap gap-3">
            <Pill
              text="VISUALIZE"
              color="bg-blue-500"
            />

            <Pill
              text="EXPLORE"
              color="bg-violet-500"
            />

            <Pill
              text="UNDERSTAND"
              color="bg-green-500"
            />
          </div>

          {/* Heading */}

          <div
            className="
              font-black
              tracking-[-0.065em]
              leading-[0.88]
              text-[clamp(4rem,7vw,6.5rem)]
            "
          >
            <span className="block">
              Git History
            </span>

            <span
              className="
                block
                bg-gradient-to-r
                from-green-400
                via-violet-500
                to-[#c9b6ff]
                bg-clip-text
                text-transparent
              "
            >
              Time Traveller
            </span>
          </div>

          {/* Subtitle */}

          <h2
            className="
              mt-8
              text-xl
              font-black

              sm:text-2xl
            "
          >
            Turn commit history into a visual story.
          </h2>

          <p
            className="
              mt-4
              max-w-[650px]
              text-base
              leading-relaxed
              text-slate-600

              dark:text-slate-300

              sm:text-lg
            "
          >
            Explore how a project evolved, identify
            hotspots, understand contributors, and
            uncover insights — all in one interactive
            experience.
          </p>

          {/* Repository input */}

          <div className="mt-8">
            <RepoInput
              onSubmit={(url) => {
                console.log(
                  "Repository submitted:",
                  url
                );
              }}
            />

            {/* OR */}

            <div
              className="
                my-4
                flex
                max-w-[670px]
                items-center
                gap-4
              "
            >
              <div className="h-px flex-1 bg-slate-400" />

              <span className="text-sm font-bold">
                or
              </span>

              <div className="h-px flex-1 bg-slate-400" />
            </div>

            <LocalRepoButton
              onSelect={() => {
                console.log(
                  "Local repository selected"
                );
              }}
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="relative hidden lg:block">
          <BranchVisualization />
        </div>
      </div>

      {/* Mobile visualization */}

      <div className="relative z-10 mt-10 lg:hidden">
        <BranchVisualization />
      </div>
    </section>
  );
}

function Pill({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-full
        border-2
        border-black
        bg-[#f8f5ea]
        px-4
        py-1.5
        text-xs
        font-bold
        shadow-[2px_2px_0px_#050402]

        dark:border-white
        dark:bg-[#111111]
        dark:shadow-[2px_2px_0px_#000]
      "
    >
      <span
        className={`size-2.5 rounded-full ${color}`}
      />

      {text}
    </div>
  );
}