import { GitBranch } from "lucide-react";
import { ThemeToggle } from "../layout/ThemeToggle";


const AnalysisHeader = () => {
  return (
    <header
      className="
        h-[74px]
        sticky top-1 z-50
        rounded-2xl
        border
        m-2
        border-black/12
        bg-[#F8F5EA]/90
        px-6
        backdrop-blur
        dark:border-[#F8F5EA]/15
        dark:bg-[#050402]/90
      "
    >
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <GitBranch
            className="
              h-9
              w-9
              stroke-[2.5]
              text-green-600
              dark:text-purple-400
            "
          />

          <div className="flex items-center gap-2">
            <h1
              className="
                font-mono
                text-xl
                font-bold
                tracking-tight
                text-[#050402]
                dark:text-[#f8f5ea]
              "
            >
              Git History Time Traveller
            </h1>

            <span
              className="
                rounded-md
                border-2
                border-[#050402]
                px-2
                py-1
                font-mono
                text-xs
                font-bold
                dark:border-[#f8f5ea]
              "
            >
              v1.0
            </span>
          </div>
        </div>

        {/* Theme */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default AnalysisHeader;