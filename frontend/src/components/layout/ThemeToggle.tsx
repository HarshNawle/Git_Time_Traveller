import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme.store";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        h-12
        w-16
        rounded-xl
        border-[2px]
        border-black
        bg-white
        shadow-[3px_3px_0px_#09090b]

        dark:border-white
        dark:bg-[#151a21]
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
  );
}