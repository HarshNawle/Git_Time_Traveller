import {
    CalendarDays,
    ExternalLink,
    GitBranch,
    HardDrive,
    GitCommit,
    Link,
  } from "lucide-react";
  
  import type { Repository } from "@/types/repository";
import { Avatar, AvatarImage } from "../ui/avatar";
  
  interface RepositoryInfoCardProps {
    repository: Repository;
  }
  
  const RepositoryInfoCard = ({
    repository,
  }: RepositoryInfoCardProps) => {
    return (
      <section
        className="
          rounded-2xl
          border
          border-black/10
          bg-white/60
          p-6
          shadow-sm
          dark:border-white/10
          dark:bg-white/[0.03]
        "
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Repository identity */}
          <div className="flex items-start gap-5">
            <div
              className="
                flex
                shrink-0
                items-center
                justify-center
                border-none
              "
            >
              {/* <img className="text-white dark:bg-white rounded-full" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" /> */}
              <Avatar className="size-20">
                <AvatarImage className="dark:bg-white" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" />
                    {/* <img className="text-white dark:bg-white rounded-full" src="https://unpkg.com/simple-icons@v16/icons/GitHub.svg" /> */}
              {/* <AvatarFallback className="bg-[#5C4033] rounded-full text-xs font-bold text-white">
                H
              </AvatarFallback> */}
            </Avatar>
            </div>
  
            <div>
              <h2 className="text-3xl font-bold">
                {repository.fullName}
              </h2>
  
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                {repository.description}
              </p>
  
              {/* Topics */}
              <div className="mt-4 flex flex-wrap gap-2">
                {repository.topics?.map((topic, index) => (
                  <span
                    key={topic}
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      dark:text-black
                      font-medium
  
                      ${
                        index % 3 === 0
                          ? "bg-[#c3deb1]"
                          : index % 3 === 1
                          ? "bg-[#d8f0df]"
                          : "bg-[#ddd0ff]"
                      }
                    `}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
  
          {/* Repository metadata */}
          <div
            className="
              min-w-[320px]
              border-l
              border-black/10
              pl-6
              dark:border-white/10
            "
          >
            <InfoRow
              icon={<Link />}
              label="Repository"
              value={repository.url}
              external
            />
  
            <InfoRow
              icon={<GitBranch />}
              label="Default Branch"
              value={repository.defaultBranch}
            />
  
            <InfoRow
              icon={<GitCommit />}
              label="Estimated Commits"
              value={`~ ${repository.estimatedCommits?.toLocaleString()}+`}
            />
  
            <InfoRow
              icon={<HardDrive />}
              label="Repository Size"
              value={repository.size ?? "-"}
            />
  
            <InfoRow
              icon={<CalendarDays />}
              label="Created"
              value={repository.createdAt ?? "-"}
            />
          </div>
        </div>
      </section>
    );
  };
  
  interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    external?: boolean;
  }
  
  const InfoRow = ({
    icon,
    label,
    value,
    external,
  }: InfoRowProps) => {
    return (
      <div className="flex items-center gap-3 py-1.5 text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          {icon}
        </span>
  
        <span className="text-slate-600 dark:text-slate-400">
          {label}
        </span>
  
        <span className="ml-auto flex max-w-[220px] items-center gap-1 truncate font-medium">
          {value}
  
          {external && (
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-purple-600" />
          )}
        </span>
      </div>
    );
  };
  
  export default RepositoryInfoCard;