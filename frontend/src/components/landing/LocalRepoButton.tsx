import { FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LocalRepoButtonProps {
  onSelect?: () => void;
}

export function LocalRepoButton({
  onSelect,
}: LocalRepoButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onSelect}
      className="
        h-14
        rounded-xl
        border-[3px]
        border-black
        bg-[#c3deb1]
        px-5
        font-bold
        text-black
        shadow-[4px_4px_0px_#050402]
        transition-transform
        hover:translate-x-[1px]
        hover:translate-y-[1px]
        hover:bg-[#c3deb1]

        dark:border-white
        dark:bg-[#18231b]
        dark:text-[#c3deb1]
        dark:shadow-[4px_4px_0px_#000]
        dark:hover:bg-[#18231b]
      "
    >
      <FolderOpen className="mr-3 size-5" />

      Choose Local Repository
    </Button>
  );
}