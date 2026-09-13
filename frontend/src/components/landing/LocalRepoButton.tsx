import {
    FolderOpen,
  } from "lucide-react";
  
  import { Button } from "@/components/ui/button";
  
  export function LocalRepoButton() {
    const supported =
      "showDirectoryPicker" in window;
  
    const chooseRepository = async () => {
      if (!supported) return;
  
      try {
        const directory =
          await window.showDirectoryPicker();
  
        const gitHandle =
          await directory.getDirectoryHandle(
            ".git"
          );
  
        if (!gitHandle) {
          throw new Error(
            "Not a Git repository"
          );
        }
  
        console.log(
          "Git repository:",
          directory.name
        );
  
        // Next step:
        // start local WASM parsing
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={!supported}
          onClick={chooseRepository}
          className="
            h-13
            rounded-xl
            border-2
            border-black
            bg-white
            px-6
            font-semibold
            text-blue-700
            shadow-[4px_4px_0px_#09090b]
          "
        >
          <FolderOpen className="mr-3 size-5" />
  
          Choose Local Repository
        </Button>
  
        {!supported && (
          <p className="mt-2 max-w-sm text-xs text-slate-500">
            Local repo analysis requires Chrome
            or Edge. You can still analyze any
            public GitHub repo above.
          </p>
        )}
      </div>
    );
  }