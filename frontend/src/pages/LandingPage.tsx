import {
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  Brain,
  BarChart3,
  Database,
  Link2,
  GitBranch,
} from "lucide-react";

import type { ElementType } from "react";

import { Hero } from "@/components/landing/Hero";
import { FeatureHighlights } from "@/components/landing/FeatureHighlights";

export default function LandingPage() {
  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#f8f5ea]
        text-[#050402]
        transition-colors

        dark:bg-[#050402]
        dark:text-[#f8f5ea]
      "
    >
      <main>
        {/* HERO */}

        <Hero />

        {/* ABOUT */}

        <section
          id="about"
          className="
            border-b-2
            border-black
            px-5
            py-20

            dark:border-white
          "
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="flex justify-center">
              <SectionLabel text="ABOUT" />
            </div>

            <div
              className="
                mt-12
                grid
                gap-12

                lg:grid-cols-[40%_60%]
              "
            >
              {/* About text */}

              <div>
                <h2
                  className="
                    text-4xl
                    font-black
                    tracking-tight

                    sm:text-5xl
                  "
                >
                  Git history tells the story.
                </h2>

                <h3
                  className="
                    mt-2
                    text-4xl
                    font-black
                    text-green-600

                    dark:text-[#c3deb1]

                    sm:text-5xl
                  "
                >
                  We make it{" "}
                  <span className="text-violet-500">
                    visible.
                  </span>
                </h3>

                <p
                  className="
                    mt-7
                    max-w-xl
                    text-base
                    leading-relaxed
                    text-slate-600

                    dark:text-slate-300

                    sm:text-lg
                  "
                >
                  Git is powerful, but its history is
                  difficult to understand through a
                  terminal alone. Git History Time
                  Traveller transforms thousands of
                  commits into an interactive, visual
                  story of how your codebase evolved.
                </p>
              </div>

              {/* Benefits */}

              <div className="grid md:grid-cols-3">
                <Benefit
                  icon={Sparkles}
                  title="Understand faster"
                  description="Explore a project's evolution visually instead of reading thousands of log entries."
                />

                <Benefit
                  icon={ShieldCheck}
                  title="Find hidden risk"
                  description="Identify high-churn files, maintenance hotspots, and contributor concentration."
                />

                <Benefit
                  icon={Users}
                  title="Share the story"
                  description="Export visualizations for onboarding, documentation, presentations, and retrospectives."
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <FeatureHighlights />

        {/* HOW IT WORKS */}

        <section
          id="how-it-works"
          className="
            border-b-2
            border-black
            px-5
            py-20

            dark:border-white
          "
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex justify-center">
              <SectionLabel text="HOW IT WORKS" />
            </div>

            <h2
              className="
                mt-6
                text-center
                text-4xl
                font-black

                sm:text-5xl
              "
            >
              From repository to{" "}
              <span className="text-violet-500">
                insights.
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-center
                text-slate-600

                dark:text-slate-300
              "
            >
              Get from a GitHub repository to a full
              visual analysis in just a few simple
              steps.
            </p>

            <div
              className="
                mt-14
                grid
                gap-10

                md:grid-cols-4
              "
            >
              <WorkStep
                number="1."
                title="Input Repository"
                description="Paste a GitHub URL or choose a local repo"
                icon={Link2}
                bg="bg-[#fcf0be]"
              />

              <WorkStep
                number="2."
                title="Analyze"
                description="We process commits, files, and changes"
                icon={Database}
                bg="bg-[#c9b6ff]"

              />

              <WorkStep
                number="3."
                title="Explore"
                description="Visualize timeline, heatmap, and contributors"
                icon={BarChart3}
                bg="bg-[#c3deb1]"
              />

              <WorkStepNoArrow
                number="4."
                title="Get Insights"
                description="Discover key insights and hotspots"
                icon={Brain}
                bg="bg-[#fcf0be]"
              />
            </div>
          </div>
        </section>
      </main>

      {/* SIMPLE FOOTER */}

      <footer className="px-5 py-8">
        <div className="mx-auto max-w-[1500px]">
          <div
            className="
              flex
              flex-col
              gap-6

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <GitBranch className="size-8 text-blue-600" />

              <div>
                <p className="font-mono font-bold">
                  Git History Time Traveller
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Turn commit history into a visual story.
                </p>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <a
                href="/privacy"
                className="hover:opacity-50"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="hover:opacity-50"
              >
                Terms
              </a>

              <a
                href="/contact"
                className="hover:opacity-50"
              >
                Contact
              </a>
            </div>
          </div>

          <div
            className="
              mt-7
              border-t
              border-slate-300
              pt-5
              text-xs
              text-slate-500

              dark:border-slate-700
              dark:text-slate-400
            "
          >
            © 2026 Git History Time Traveller. Open
            source. Built for developers.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------- */
/* Shared components                 */
/* -------------------------------- */

function SectionLabel({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        rounded-full
        border-2
        border-black
        px-4
        py-1
        text-xs
        font-bold

        dark:border-white
      "
    >
      {text}
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        border-l-2
        border-black
        px-6
        first:border-l-0

        dark:border-white
      "
    >
      <div
        className="
          mx-auto
          flex
          size-12
          items-center
          justify-center
          rounded-xl
          border-2
          border-black
          bg-[#c3deb1]

          dark:border-white
        "
      >
        <Icon className="size-6" />
      </div>

      <h3 className="mt-5 text-center font-black">
        {title}
      </h3>

      <p
        className="
          mt-3
          text-center
          text-sm
          leading-relaxed
          text-slate-600

          dark:text-slate-300
        "
      >
        {description}
      </p>
    </div>
  );
}

function WorkStep({
  number,
  title,
  description,
  icon: Icon,
  bg,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  bg: string;
}) {
  return (
    <div className="relative text-center">
      <div
        className={`
          ${bg}

          mx-auto
          flex
          size-16
          items-center
          justify-center
          rounded-full
          border-[3px]
          border-black
          shadow-[3px_3px_0px_#050402]

          dark:border-white
          dark:shadow-[3px_3px_0px_#000]
        `}
      >
        <Icon className="size-7 text-black" />
      </div>

      <h3 className="mt-5 font-black">
        {number} {title}
      </h3>

      <p
        className="
          mx-auto
          mt-2
          max-w-[210px]
          text-sm
          text-slate-600

          dark:text-slate-300
        "
      >
        {description}
      </p>

        <ArrowRight
          className="
          absolute
          right-[-30px]
          top-6
          hidden
          size-7

          md:block
        "
        />


    </div>
  );
}

function WorkStepNoArrow({
  number,
  title,
  description,
  icon: Icon,
  bg,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  bg: string;
}) {
  return (
    <div className="relative text-center">
      <div
        className={`
          ${bg}

          mx-auto
          flex
          size-16
          items-center
          justify-center
          rounded-full
          border-[3px]
          border-black
          shadow-[3px_3px_0px_#050402]

          dark:border-white
          dark:shadow-[3px_3px_0px_#000]
        `}
      >
        <Icon className="size-7 text-black" />
      </div>

      <h3 className="mt-5 font-black">
        {number} {title}
      </h3>

      <p
        className="
          mx-auto
          mt-2
          max-w-[210px]
          text-sm
          text-slate-600

          dark:text-slate-300
        "
      >
        {description}
      </p>
    </div>
  );
}