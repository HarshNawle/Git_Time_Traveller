import { GitBranch, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import GlobalSearch from "@/components/layout/GlobalSearch";
import { AccountMenuTrigger } from "@/components/layout/AccountMenuTrigger";
import { useAuthStore } from "@/stores/auth.store";
import { useThemeStore } from "@/stores/theme.store";

interface DashboardHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DashboardHeader({
  search,
  onSearchChange,
}: DashboardHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5EA]/95 backdrop-blur dark:bg-[#050402]/95">
      <div className="flex h-[72px] items-center gap-4 px-5 lg:px-8">
        <Link to="/dashboard" className="flex shrink-0 items-center gap-2">
          <GitBranch className="size-6 text-emerald-600 dark:text-purple-400" />
          <span className="hidden font-mono text-base font-black tracking-tight sm:block lg:text-lg">
            Git History Time Traveller
          </span>
          <span className="rounded-md border border-[#050402]/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold dark:border-[#F8F5EA]/30">
            v1.0
          </span>
        </Link>

        <div className="mx-6 hidden min-w-0 flex-1 md:block">
          <GlobalSearch value={search} onChange={onSearchChange} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="size-10 rounded-xl border border-[#050402]/15 bg-white shadow-none dark:border-[#F8F5EA]/20 dark:bg-[#111111]"
          >
            {theme === "light" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {user ? (
            <AccountMenuTrigger user={user} compact />
          ) : (
            <Avatar className="size-10">
              <AvatarImage src={undefined} alt="Account" />
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
}
