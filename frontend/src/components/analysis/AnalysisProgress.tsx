import { Database } from "lucide-react";

import type { AnalysisJob } from "@/types/analysis";

import AnalysisStep from "./AnalysisStep";

interface AnalysisProgressProps {
  job: AnalysisJob;
}

const AnalysisProgress = ({
  job,
}: AnalysisProgressProps) => {
  return (
    <section
      className="
        rounded-2xl
        border
        border-black/10
        bg-white/60
        p-6
        shadow-sm
        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#c3deb1]
              text-[#00a866]
            "
          >
            <Database className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Analysis Progress
            </h2>

            <p className="font-mono text-sm text-slate-500">
              Step {job.currentStep} of {job.totalSteps}:{" "}
              {job.currentStepLabel}...
            </p>
          </div>
        </div>

        <div className="text-right">
          <div
            className="
              bg-gradient-to-r
              from-green-400
              via-purple-400
              to-[#c9b6ff]
              bg-clip-text
              text-4xl
              font-bold
              text-transparent
            "
          >
            {job.progress}%
          </div>

          {job.estimatedTime && (
            <p className="font-mono text-xs text-slate-500">
              Estimated time: {job.estimatedTime}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="h-5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-green-400
              via-purple-400
              to-[#c9b6ff]
              transition-all
              duration-700
            "
            style={{
              width: `${job.progress}%`,
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="mt-7">
        {job.steps.map((step, index) => (
          <AnalysisStep
            key={step.id}
            step={step}
            isLast={index === job.steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default AnalysisProgress;