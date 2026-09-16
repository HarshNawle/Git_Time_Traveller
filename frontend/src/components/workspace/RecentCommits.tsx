import { GitCommitHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const commits = [
  {
    author: "leerob",
    sha: "a3f9c12",
    message: "feat: add server actions support",
    branch: "main",
    date: "Mar 12, 2024",
    additions: "+142",
    deletions: "-23",
  },
  {
    author: "shuding",
    sha: "b21de44",
    message: "fix: middleware edge case",
    branch: "fix/ui",
    date: "Mar 11, 2024",
    additions: "+56",
    deletions: "-12",
  },
  {
    author: "ijjk",
    sha: "9cc0011",
    message: "chore: update dependencies",
    branch: "develop",
    date: "Mar 10, 2024",
    additions: "+412",
    deletions: "-210",
  },
  {
    author: "huozhi",
    sha: "4ab7821",
    message: "refactor: improve cache handling",
    branch: "feature/ai",
    date: "Mar 9, 2024",
    additions: "+98",
    deletions: "-34",
  },
  {
    author: "timneutkens",
    sha: "d91c3f2",
    message: "add new feature",
    branch: "feature/auth",
    date: "Mar 8, 2024",
    additions: "+76",
    deletions: "-11",
  },
];

const branchStyles: Record<string, string> = {
  main: "bg-[#EDE4FF] text-[#6D28D9]",
  "fix/ui": "bg-[#FCF0BE] text-[#854D0E]",
  develop: "bg-[#FED7AA] text-[#9A3412]",
  "feature/ai": "bg-[#FBCFE8] text-[#9D174D]",
  "feature/auth": "bg-[#FDE68A] text-[#92400E]",
};

const avatarColors = [
  "bg-[#C9B6FF]",
  "bg-[#C3DEB1]",
  "bg-[#FBCFE8]",
  "bg-[#FCF0BE]",
  "bg-[#A5F3FC]",
];

export function RecentCommits() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-[#050402]/12
        bg-white/80
        dark:border-[#F8F5EA]/15
        dark:bg-[#0b0b0b]
      "
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#F9C5D5] text-[#050402]">
            <GitCommitHorizontal className="size-4" />
          </div>
          <h3 className="font-black">Recent Commits</h3>
        </div>

        <button className="text-sm font-semibold text-emerald-600">
          View all commits →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs opacity-45">
              <th className="px-4 pb-2 font-medium">Author</th>
              <th className="px-4 pb-2 font-medium">Commit</th>
              <th className="px-4 pb-2 font-medium">Message</th>
              <th className="px-4 pb-2 font-medium">Branch</th>
              <th className="px-4 pb-2 font-medium">Date</th>
              <th className="px-4 pb-2 font-medium">Changes</th>
            </tr>
          </thead>

          <tbody>
            {commits.map((commit, index) => (
              <tr key={commit.sha} className="border-t border-[#050402]/8">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    <Avatar className="size-7">
                      <AvatarFallback
                        className={`${avatarColors[index]} text-[10px] font-bold text-[#050402]`}
                      >
                        {commit.author[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {commit.author}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{commit.sha}</td>
                <td className="px-4 py-3">{commit.message}</td>
                <td className="px-4 py-3">
                  <span
                    className={`
                      rounded-full px-2 py-0.5 text-xs font-semibold
                      ${branchStyles[commit.branch] ?? "bg-black/5"}
                    `}
                  >
                    {commit.branch}
                  </span>
                </td>
                <td className="px-4 py-3 opacity-60">{commit.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-emerald-600">{commit.additions}</span>
                  {" / "}
                  <span className="text-red-500">{commit.deletions}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
