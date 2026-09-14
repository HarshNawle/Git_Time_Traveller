import {
  Brain,
  Grid2X2,
  Play,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Animated Timeline",
    description:
      "Watch your repository evolve commit by commit. See files appear, grow, change, and disappear across time.",
    icon: Play,
    className:
      "bg-[#fcf0be] dark:bg-[#211f13]",
  },
  {
    title: "Churn Heatmap",
    description:
      "Identify high-churn files and folders instantly. Find maintenance hotspots and focus your efforts where it matters most.",
    icon: Grid2X2,
    className:
      "bg-[#c9b6ff] dark:bg-[#211a2d]",
  },
  {
    title: "Contributor Graph",
    description:
      "Visualize relationships between contributors and the files they touch. Discover ownership and collaboration patterns.",
    icon: Users,
    className:
      "bg-[#c3deb1] dark:bg-[#142017]",
  },
  {
    title: "AI Insights",
    description:
      "Turn repository statistics into plain-language insights. Get summaries, risk signals, and actionable recommendations.",
    icon: Brain,
    className:
      "bg-[#fcf0be] dark:bg-[#211f13]",
  },
];

export function FeatureHighlights() {
  return (
    <section
      id="features"
      className="
        border-b-2
        border-black
        px-5
        py-20

        dark:border-white
      "
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Label */}

        <div className="flex justify-center">
          <SectionLabel text="FEATURES" />
        </div>

        {/* Heading */}

        <h2
          className="
            mt-6
            text-center
            text-4xl
            font-black
            tracking-tight

            sm:text-5xl
          "
        >
          See the codebase{" "}
          <span className="text-violet-500">
            differently.
          </span>
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-center
            text-slate-600

            dark:text-slate-300
          "
        >
          Powerful visualizations to help you
          understand, explore, and make better
          decisions about any codebase.
        </p>

        {/* Feature cards */}

        <div
          className="
            mt-12
            grid
            gap-5

            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className={`
                  ${feature.className}

                  min-h-[390px]
                  rounded-2xl
                  border-[3px]
                  border-black
                  text-black
                  shadow-[6px_6px_0px_#050402]

                  dark:border-white
                  dark:text-white
                  dark:shadow-[6px_6px_0px_#000]
                `}
              >
                <CardContent className="flex h-full flex-col p-5">
                  {/* Icon */}

                  <div
                    className="
                      flex
                      size-12
                      items-center
                      justify-center
                      rounded-xl
                      border-2
                      border-black

                      dark:border-white
                    "
                  >
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Visual */}

                  <div
                    className="
                      mt-auto
                      pt-6
                    "
                  >
                    <FeatureVisual
                      title={feature.title}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

function FeatureVisual({
  title,
}: {
  title: string;
}) {
  if (title === "Animated Timeline") {
    return (
      <div
        className="
          h-28
          rounded-xl
          border-2
          border-black
          bg-[#101820]
          p-3

          dark:border-white
        "
      >
        <svg
          viewBox="0 0 300 100"
          className="h-full w-full"
        >
          <path
            d="
              M5 70
              L50 70
              L85 55
              L120 55
              L155 40
              L195 40
              L230 25
              L295 25
            "
            fill="none"
            stroke="#c9b6ff"
            strokeWidth="5"
          />

          {[5, 50, 85, 120, 155, 195, 230].map(
            (x, index) => (
              <circle
                key={x}
                cx={x}
                cy={
                  index < 2
                    ? 70
                    : 70 - index * 8
                }
                r="5"
                fill="#c3deb1"
              />
            )
          )}
        </svg>
      </div>
    );
  }

  if (title === "Churn Heatmap") {
    return (
      <div
        className="
          grid
          h-28
          grid-cols-10
          gap-1
          rounded-xl
          border-2
          border-black
          bg-[#101820]
          p-3

          dark:border-white
        "
      >
        {Array.from({ length: 60 }).map(
          (_, index) => (
            <span
              key={index}
              className={`
                rounded-sm

                ${
                  index % 5 === 0
                    ? "bg-[#fb81a3]"
                    : index % 3 === 0
                      ? "bg-[#c9b6ff]"
                      : "bg-[#26303a]"
                }
              `}
            />
          )
        )}
      </div>
    );
  }

  if (title === "Contributor Graph") {
    return (
      <div
        className="
          h-28
          rounded-xl
          border-2
          border-black
          bg-[#101820]
          p-3

          dark:border-white
        "
      >
        <svg
          viewBox="0 0 300 120"
          className="h-full w-full"
        >
          <g
            stroke="#c9b6ff"
            strokeWidth="2"
          >
            <line
              x1="150"
              y1="60"
              x2="50"
              y2="25"
            />

            <line
              x1="150"
              y1="60"
              x2="70"
              y2="100"
            />

            <line
              x1="150"
              y1="60"
              x2="235"
              y2="25"
            />

            <line
              x1="150"
              y1="60"
              x2="250"
              y2="95"
            />

            <line
              x1="150"
              y1="60"
              x2="150"
              y2="15"
            />
          </g>

          <circle
            cx="150"
            cy="60"
            r="9"
            fill="#fb81a3"
          />

          <circle
            cx="50"
            cy="25"
            r="7"
            fill="#c3deb1"
          />

          <circle
            cx="70"
            cy="100"
            r="7"
            fill="#c9b6ff"
          />

          <circle
            cx="235"
            cy="25"
            r="7"
            fill="#c3deb1"
          />

          <circle
            cx="250"
            cy="95"
            r="7"
            fill="#fb81a3"
          />

          <circle
            cx="150"
            cy="15"
            r="7"
            fill="#fcf0be"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="
        h-28
        space-y-3
        rounded-xl
        border-2
        border-black
        bg-[#101820]
        p-4

        dark:border-white
      "
    >
      {[1, 2, 3].map((number) => (
        <div
          key={number}
          className="flex items-center gap-2"
        >
          <span
            className="
              flex
              size-5
              items-center
              justify-center
              rounded-full
              bg-[#fcf0be]
              text-xs
              font-bold
              text-black
            "
          >
            {number}
          </span>

          <div className="h-4 flex-1 rounded bg-slate-700" />
        </div>
      ))}
    </div>
  );
}