import {
  GitBranch,
  History,
  Moon,
  Search,
  Share2,
  Sun,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useThemeStore } from "@/stores/theme.store";

export function WorkspaceTopBar() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header
      className="
      sticky top-1 z-50
      h-[72px]
      rounded-2xl
        border
        border-[#050402]/12
        bg-[#F8F5EA]/90
        backdrop-blur
        dark:border-[#F8F5EA]/15
        dark:bg-[#050402]/90
      "
    >
      <div className="flex h-full items-center gap-3 px-3 lg:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <div
            className="
              flex size-10 items-center justify-center
              rounded-xl
              text-[#050402]
            "
          >
            <GitBranch
            className="
              size-8
              text-green-600

              dark:text-purple-400
            "
          />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <h1 className="hidden
              font-mono
              text-lg
              font-black
              tracking-tight

              sm:block
              lg:text-xl">
              Git History Time Traveller
            </h1>

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
          </div>
        </div>

        <div className="mx-5 hidden min-w-0 flex-1 md:block">
          <div className="relative">
            <Search className="text-black absolute left-3.5 top-1/2 size-4 -translate-y-1/2" />

            <form action=""
                className="flex
                h-12
                overflow-hidden
                rounded-2xl
                border-[3px]
                border-[#050402]
                bg-[#F8F5EA]/90
                shadow-[6px_6px_0px_#050402]
                dark:border-white
                dark:bg-[#111111]
                dark:shadow-[6px_6px_0px_#000]
            "
            >

            <Input
              placeholder="Search files, commits, or authors..."
              className="
                h-11
                font-mono
                text-lg
                font-black
                tracking-tight
                border-none
                text-black
                border-[#050402]
                bg-transparent
                pl-10
                pr-10
                placeholder:text-slate-900
                dark:text-white
                dark:placeholder:text-slate-500
                sm:block
                lg:text-xl
              "
            />
            </form>

            {/* <kbd
              className="
                absolute right-3 top-1/2
                -translate-y-1/2
                rounded-md border
                border-[#050402]/15
                px-1.5 py-0.5
                text-[10px] opacity-50
              "
            >
              /
            </kbd> */}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
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
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

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
            <History className="size-4" />
          </Button>

          <Button
            variant="outline"
            className="
              h-11
              w-20
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
              hidden 
              px-4
              sm:flex
            "
          >
            <Share2 />
            Share
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="
            flex 
            gap-1
              h-11
              w-21
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
            <Upload />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <div
            className="
            p-2
            flex 
            gap-2
            items-center
              h-11
              w-25
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
              sm:flex
            "
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-[#5C4033] rounded-xl text-xs font-bold text-white">
                H
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold">Harsh</span>
          </div>
        </div>
      </div>
    </header>
  );
}
