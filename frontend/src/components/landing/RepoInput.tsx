import { ArrowRight, Link2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface RepoInputProps {
  onSubmit?: (url: string) => void;
}

export function RepoInput({
  onSubmit,
}: RepoInputProps) {
  const [url, setUrl] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const value = url.trim();

    if (!value) return;

    onSubmit?.(value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        h-17
        w-full
        max-w-[670px]
        overflow-hidden
        rounded-2xl
        border-[3px]
        border-[#050402]
        bg-white
        shadow-[6px_6px_0px_#050402]

        dark:border-white
        dark:bg-[#111111]
        dark:shadow-[6px_6px_0px_#000]
      "
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 sm:px-5">
        <Link2
          className="
            size-5
            shrink-0
            text-blue-600

            dark:text-[#c9b6ff]
          "
        />

        <input
          value={url}
          onChange={(event) =>
            setUrl(event.target.value)
          }
          placeholder="Paste a GitHub repository URL..."
          className="
            min-w-0
            flex-1
            bg-transparent
            text-sm
            font-medium
            text-black
            outline-none
            placeholder:text-slate-500

            dark:text-white
            dark:placeholder:text-slate-500

            sm:text-base
          "
        />
      </div>

      <Button
        type="submit"
        className="
          m-1
          h-[58px]
          rounded-xl
          bg-gradient-to-r
          from-green-500
          to-purple-400
          px-4
          font-bold
          text-white
          hover:opacity-90

          sm:px-7
          sm:text-base
        "
      >
        <span className="hidden sm:inline">
          Visualize
        </span>

        <ArrowRight className="size-5 sm:ml-2" />
      </Button>
    </form>
  );
}