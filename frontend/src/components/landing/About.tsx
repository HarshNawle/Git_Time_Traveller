import { ShieldCheck, Sparkles, Users } from 'lucide-react';
import  { type ElementType } from 'react'

const About = () => {
  return (
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
  )
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

export default About