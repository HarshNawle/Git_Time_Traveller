import {
    AlertTriangle,
    ArrowLeft,
    Database,
    Lock,
    RefreshCw,
    WifiOff,
  } from "lucide-react";
  
  import { Button } from "@/components/ui/button";
  
  interface AnalysisErrorProps {
    message?: string;
  
    onRetry: () => void;
  
    onGoBack: () => void;
  }
  
  const AnalysisError = ({
    message,
    onRetry,
    onGoBack,
  }: AnalysisErrorProps) => {
    return (
      <div className="min-h-[calc(100vh-74px)]">
        <div className="mx-auto max-w-[1250px] px-6 pb-12">
          {/* Page heading */}
          <section className="py-10 text-center">
            <h1
              className="
                bg-gradient-to-r
                from-[#00b96b]
                via-[#159f9f]
                to-[#6d28ff]
                bg-clip-text
                text-5xl
                font-extrabold
                tracking-tight
                text-transparent
              "
            >
              Analyzing Repository
            </h1>
  
            <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-slate-600 dark:text-slate-400">
              We're fetching and processing the complete Git history.
              <br />
              Something went wrong while analyzing the repository.
            </p>
          </section>
  
          {/* Error card */}
          <section
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50/70
              p-10
              shadow-sm
              dark:border-red-900/50
              dark:bg-red-950/10
            "
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  bg-red-100
                  text-red-600
                  dark:bg-red-950/40
                  dark:text-red-400
                "
              >
                <AlertTriangle className="h-14 w-14" />
              </div>
            </div>
  
            {/* Heading */}
            <div className="mt-6 text-center">
              <h2 className="text-3xl font-bold">
                Analysis Failed
              </h2>
  
              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                {message ??
                  "We couldn't analyze this repository. This could be due to one of the following reasons."}
              </p>
            </div>
  
            {/* Possible reasons */}
            <div
              className="
                mx-auto
                mt-7
                max-w-2xl
                rounded-xl
                border
                border-red-200
                bg-white/70
                p-5
                dark:border-red-900/50
                dark:bg-white/[0.03]
              "
            >
              <ErrorReason
                icon={<WifiOff />}
                text="Network connectivity issues"
              />
  
              <ErrorReason
                icon={<Lock />}
                text="Repository is private or not accessible"
              />
  
              <ErrorReason
                icon={<Database />}
                text="Repository is too large"
              />
  
              <ErrorReason
                icon={<AlertTriangle />}
                text="GitHub API rate limit exceeded"
              />
            </div>
  
            {/* Actions */}
            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={onRetry}
                className="
                  h-12
                  rounded-xl
                  bg-gradient-to-r
                  from-[#00b96b]
                  to-[#6d28ff]
                  px-7
                  font-semibold
                  text-white
                  shadow-md
                  transition
                  hover:opacity-90
                "
              >
                <RefreshCw className="mr-2 h-4 w-4" />
  
                Try Again
              </Button>
  
              <Button
                variant="outline"
                onClick={onGoBack}
                className="
                  h-12
                  rounded-xl
                  border-2
                  border-black/10
                  bg-white/70
                  px-7
                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
  
                Go Back
              </Button>
            </div>
  
            {/* Footer message */}
            <p className="mt-6 text-center font-mono text-xs text-slate-500">
              If the problem persists, check the repository URL or
              try again later.
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  interface ErrorReasonProps {
    icon: React.ReactNode;
    text: string;
  }
  
  const ErrorReason = ({
    icon,
    text,
  }: ErrorReasonProps) => {
    return (
      <div className="flex items-center gap-4 py-3">
        <span className="text-slate-700 dark:text-slate-300">
          {icon}
        </span>
  
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {text}
        </span>
      </div>
    );
  };
  
  export default AnalysisError;