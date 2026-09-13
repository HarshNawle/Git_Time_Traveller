import {
  Brain,
  Grid3X3,
  Play,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Animated Timeline",
    description: "Watch your code evolve",
    icon: Play,
    className: "bg-blue-50",
    iconClass: "bg-blue-200",
  },
  {
    title: "Churn Heatmap",
    description: "Spot high-risk files",
    icon: Grid3X3,
    className: "bg-purple-50",
    iconClass: "bg-purple-200",
  },
  {
    title: "Contributor Graph",
    description: "See who built what",
    icon: Users,
    className: "bg-green-50",
    iconClass: "bg-green-200",
  },
  {
    title: "AI Insights",
    description: "Get actionable takeaways",
    icon: Brain,
    className: "bg-orange-50",
    iconClass: "bg-orange-200",
  },
];

export function FeatureHighlights() {
  return (
    <section
      id="features"
      className="
        relative
        z-30
        mx-auto
        max-w-[1580px]
        px-5
        pb-10
        md:px-10
        lg:px-16
      "
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className={`
                ${feature.className}
                rounded-2xl
                border-[3px]
                border-black
                p-5
                shadow-[6px_6px_0px_#09090b]
                transition-transform
                duration-200
                hover:-translate-y-1
              `}
            >
              <div className="flex items-center gap-4">

                <div
                  className={`
                    flex
                    size-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-black
                    ${feature.iconClass}
                  `}
                >
                  <Icon className="size-7" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>

              </div>
            </Card>
          );
        })}

      </div>
    </section>
  );
}