import { Button } from "@/components/ui/button";

const examples = [
  {
    name: "facebook/react",
    url: "https://github.com/facebook/react",
  },
  {
    name: "vercel/next.js",
    url: "https://github.com/vercel/next.js",
  },
  {
    name: "nodejs/node",
    url: "https://github.com/nodejs/node",
  },
];

export function ExampleRepos() {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <span className="mr-1 self-center text-sm text-slate-500">
        Try:
      </span>

      {examples.map((repo) => (
        <Button
          key={repo.name}
          variant="outline"
          size="sm"
          className="
            rounded-full
            border-2
            border-slate-300
            bg-white
            font-mono
            text-xs
            hover:border-blue-500
            hover:text-blue-600
          "
        >
          {repo.name}
        </Button>
      ))}
    </div>
  );
}