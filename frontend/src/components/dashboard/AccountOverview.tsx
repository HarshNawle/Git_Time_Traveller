import type { ReactNode } from "react";
import { BookMarked, Calendar, ExternalLink, GitFork, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DashboardProfile } from "@/types/dashboard";

interface AccountOverviewProps {
  profile: DashboardProfile;
}

export default function AccountOverview({ profile }: AccountOverviewProps) {
  return (
    <aside className="rounded-2xl border border-[#050402]/8 bg-white p-5 dark:border-[#F8F5EA]/10 dark:bg-[#111111]">
      <div className="flex flex-col items-center text-center">
        <Avatar className="size-20">
          <AvatarImage src={profile.avatarUrl} alt={profile.username} />
          <AvatarFallback className="text-lg">
            {profile.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h2 className="mt-4 text-lg font-semibold">{profile.name}</h2>
        <p className="text-sm text-[#050402]/50 dark:text-[#F8F5EA]/50">
          @{profile.username}
        </p>

        <a
          href={profile.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#050402]/12 px-3 py-2 text-sm font-medium transition hover:bg-black/4 dark:border-[#F8F5EA]/15 dark:hover:bg-white/6"
        >
          View GitHub Profile
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <ProfileStat
          icon={<BookMarked className="size-4" />}
          label="Public Repositories"
          value={profile.publicRepositories}
        />
        <ProfileStat
          icon={<GitFork className="size-4" />}
          label="Private Repositories"
          value={profile.privateRepositories}
        />
        <ProfileStat
          icon={<Users className="size-4" />}
          label="Followers"
          value={profile.followers}
        />
        <ProfileStat
          icon={<Users className="size-4" />}
          label="Following"
          value={profile.following}
        />
        <ProfileStat
          icon={<Calendar className="size-4" />}
          label="Member Since"
          value={profile.memberSince}
        />
      </dl>
    </aside>
  );
}

function ProfileStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 text-[#050402]/55 dark:text-[#F8F5EA]/55">
        {icon}
        {label}
      </dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
