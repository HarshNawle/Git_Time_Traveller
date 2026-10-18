import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { authApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import type { AuthUser } from "@/types/auth";

interface AccountMenuTriggerProps {
  user: AuthUser;
}

export function AccountMenuTrigger({ user }: AccountMenuTriggerProps) {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      clearSession();
      navigate("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-11 w-11 rounded-xl gap-1 p-0"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.githubUsername} />
            <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {user.githubUsername.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="size-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal px-2 py-1.5">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-slate-500">
              @{user.githubUsername}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onClick={() => navigate("/my-repos")}>
          <User className="mr-2 h-4 w-4" />
          My Repositories
        </DropdownMenuItem>
        <DropdownMenuItem asChild onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}