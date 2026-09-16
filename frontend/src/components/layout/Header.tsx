import {
  GitBranch,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme.store";
import { useUIStore } from "@/stores/ui-store";

export function Header() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  const mobileMenuOpen = useUIStore(
    (state) => state.mobileMenuOpen
  );

  const setMobileMenuOpen = useUIStore(
    (state) => state.setMobileMenuOpen
  );

  return (
    <header className="relative z-50 px-4 pt-4 sm:px-8">
      <nav
        className="
          mx-auto
          flex
          h-[72px]
          max-w-[1540px]
          items-center
          justify-between
          rounded-2xl
          border-[3px]
          border-[#050402]
          bg-[#f8f5ea]
          px-4
          shadow-[7px_7px_0px_#050402]
          transition-colors

          dark:border-[#f8f5ea]
          dark:bg-[#050402]
          dark:shadow-[7px_7px_0px_#000]

          sm:px-6
        "
      >
        {/* Brand */}

        <a
          href="/"
          className="flex items-center gap-2 sm:gap-3"
        >
          <GitBranch
            className="
              size-8
              text-green-600

              dark:text-purple-400
            "
          />

          <span
            className="
              hidden
              font-mono
              text-lg
              font-black
              tracking-tight

              sm:block
              lg:text-xl
            "
          >
            Git History Time Traveller
          </span>

          <span
            className="
              rounded-lg
              border-2
              border-black
              px-2
              py-1
              font-mono
              text-xs
              font-bold

              dark:border-slate-600
            "
          >
            v1.0
          </span>
        </a>

        {/* Desktop navigation */}

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#explore"
            className="text-sm font-semibold transition-opacity hover:opacity-50"
          >
            Explore
          </a>

          <a
            href="#features"
            className="text-sm font-semibold transition-opacity hover:opacity-50"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-semibold transition-opacity hover:opacity-50"
          >
            About
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-semibold transition-opacity hover:opacity-50"
          >
            Docs
          </a>
        </div>

        {/* Actions */}

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="
              size-11
              rounded-xl
              border-[3px]
              border-black
              bg-[#f8f5ea]
              shadow-[3px_3px_0px_#050402]
              cursor-pointer
              dark:border-white
              dark:bg-[#111111]
              dark:text-white
              dark:shadow-[3px_3px_0px_#000]
            "
          >
            {theme === "light" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          <Button
            className="
              hidden
              h-11
              rounded-xl
              border-[3px]
              border-black
              px-5
              font-bold
              text-black
              shadow-[3px_3px_0px_#050402]
              hover:opacity-90
              cursor-pointer
              sm:flex
              dark:text-white
              dark:border-[#f8f5ea]
            dark:bg-[#050402]
              dark:shadow-[7px_7px_0px_#000]
            "
          >
            <img height="32" width="32" className="dark:bg-white rounded-2xl" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" />
            {/* <Github className="mr-2 size-5" /> */}
            Sign in with GitHub
          </Button>

          {/* Mobile */}

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="
              size-11
              rounded-xl
              border-[3px]
              border-black
              md:hidden

              dark:border-white
            "
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile navigation */}

      {mobileMenuOpen && (
        <div
          className="
            mx-4
            mt-3
            rounded-2xl
            border-[3px]
            border-black
            bg-[#f8f5ea]
            p-4
            shadow-[5px_5px_0px_#050402]

            dark:border-white
            dark:bg-[#111111]
            dark:shadow-[5px_5px_0px_#000]

            md:hidden
          "
        >
          <div className="flex flex-col gap-3">
            {[
              ["Explore", "#explore"],
              ["Features", "#features"],
              ["About", "#about"],
              ["Docs", "#how-it-works"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                  rounded-xl
                  border-2
                  border-black
                  px-4
                  py-3
                  font-bold

                  dark:border-white
                "
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}