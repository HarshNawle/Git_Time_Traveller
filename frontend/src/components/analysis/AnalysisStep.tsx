import {
    Check,
    Circle,
    Loader2,
  } from "lucide-react";
  
  import type {
    AnalysisStep as AnalysisStepType,
  } from "@/types/analysis";
  
  interface AnalysisStepProps {
    step: AnalysisStepType;
    isLast?: boolean;
  }
  
  const AnalysisStep = ({
    step,
    isLast,
  }: AnalysisStepProps) => {
    const isCompleted = step.status === "completed";
    const isRunning = step.status === "running";
  
    return (
      <div className="relative flex gap-5">
        {/* Connector */}
        {!isLast && (
          <div
            className={`
              absolute
              left-[13px]
              top-[30px]
              h-[48px]
              w-[2px]
  
              ${
                isCompleted
                  ? "bg-[#00b96b]"
                  : "bg-slate-300 dark:bg-slate-700"
              }
            `}
          />
        )}
  
        {/* Status circle */}
        <div
          className={`
            relative
            z-10
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            border-2
  
            ${
              isCompleted
                ? "border-[#00b96b] bg-[#00b96b] text-white"
                : isRunning
                ? "border-purple-500 bg-white text-purple-600 dark:bg-[#050402]"
                : "border-slate-400 bg-[#f8f5ea] text-slate-400 dark:bg-[#050402]"
            }
          `}
        >
          {isCompleted && (
            <Check className="h-4 w-4" />
          )}
  
          {isRunning && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
  
          {step.status === "pending" && (
            <Circle className="h-3 w-3 fill-slate-300" />
          )}
        </div>
  
        {/* Text */}
        <div className="flex-1 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className={`
                  font-semibold
                  ${
                    isRunning
                      ? "bg-gradient-to-r from-[#00b96b] to-[#6d28ff] bg-clip-text text-transparent"
                      : ""
                  }
                `}
              >
                {step.title}
              </h3>
  
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
            </div>
  
            {step.duration && (
              <span className="shrink-0 text-sm text-slate-500">
                {step.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default AnalysisStep;