import { GitBranch, Sun, } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
// import { Separator } from "@/components/ui/separator";


const Header = () => {
  return (
    <header className="relative z-50 px-4 pt-4 md:px-8">
      <div
        className="
          mx-auto
          flex
          h-[76px]
          max-w-[1580px]
          items-center
          justify-between
          rounded-2xl
          border-[3px]
          border-black
          bg-white
          px-5
          shadow-[7px_7px_0px_#09090b]
          md:px-7
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex size-11 items-center justify-center">
            <GitBranch
              className="size-10 text-blue-600"
              strokeWidth={2.2}
            />
          </div>

          <div className="flex items-center gap-3">
            <span
              className="
                hidden
                font-mono
                text-lg
                font-bold
                tracking-tight
                sm:block
                md:text-xl
              "
            >
              Git History Time Traveller
            </span>

            <Badge
              variant="outline"
              className="
                border-2
                border-slate-300
                bg-white
                font-mono
                text-slate-600
              "
            >
              v1.0
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-9 lg:flex">
          <a
            href="#explore"
            className="text-sm font-medium hover:text-blue-600"
          >
            Explore
          </a>

          <a
            href="#features"
            className="text-sm font-medium hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#docs"
            className="text-sm font-medium hover:text-blue-600"
          >
            Docs
          </a>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle/>

          <Button
            className="
              h-12
              gap-2
              rounded-xl
              border-2
              border-black
              bg-gradient-to-r
              from-blue-500
              to-violet-600
              px-5
              text-white
              shadow-[4px_4px_0px_#09090b]
              hover:translate-x-[1px]
              hover:translate-y-[1px]
              hover:shadow-[3px_3px_0px_#09090b]
            "
          >
            {/* <Github className="size-5" /> */}
            <span className="hidden sm:inline">
              Sign in with GitHub
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header
