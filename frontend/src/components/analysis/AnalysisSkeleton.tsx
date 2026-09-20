import { Skeleton } from "@/components/ui/skeleton";

const AnalysisSkeleton = () => {
  return (
    <div className="min-h-[calc(100vh-74px)]">
      <div className="mx-auto max-w-[1250px] px-6 pb-12">
        {/* Page heading */}
        <section className="py-10 text-center">
          <Skeleton className="mx-auto h-12 w-[420px] rounded-xl bg-gray-200 dark:bg-white/20 " />

          <Skeleton className="mx-auto mt-4 h-5 w-[500px] rounded-md bg-gray-200 dark:bg-white/20 " />

          <Skeleton className="mx-auto mt-2 h-5 w-[330px] rounded-md bg-gray-200 dark:bg-white/20 " />
        </section>

        <div className="space-y-5">
          {/* Repository Card */}
          <RepositorySkeleton />

          {/* Analysis Progress */}
          <ProgressSkeleton />
        </div>
      </div>
    </div>
  );
};

const RepositorySkeleton = () => {
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
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* GitHub avatar */}
        <Skeleton className="h-20 w-20 shrink-0 rounded-full bg-gray-200 dark:bg-white/20 " />

        <div className="flex-1">
          {/* repository name */}
          <Skeleton className="h-9 w-64 rounded-lg bg-gray-200 dark:bg-white/20 " />

          {/* description */}
          <Skeleton className="mt-3 h-5 w-[520px] max-w-full rounded-md bg-gray-200 dark:bg-white/20 " />

          {/* badges */}
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-7 w-24 rounded-full bg-gray-200 dark:bg-white/20 " />
            <Skeleton className="h-7 w-24 rounded-full bg-gray-200 dark:bg-white/20 " />
            <Skeleton className="h-7 w-16 rounded-full bg-gray-200 dark:bg-white/20 " />
            <Skeleton className="h-7 w-24 rounded-full bg-gray-200 dark:bg-white/20 " />
            <Skeleton className="h-7 w-28 rounded-full bg-gray-200 dark:bg-white/20 " />
          </div>
        </div>

        {/* metadata */}
        <div
          className="
            min-w-[320px]
            space-y-3
            border-l
            border-black/10
            pl-6
            dark:border-white/10
          "
        >
          <Skeleton className="h-5 w-full rounded-md bg-gray-200 dark:bg-white/20 " />
          <Skeleton className="h-5 w-4/5 rounded-md bg-gray-200 dark:bg-white/20 " />
          <Skeleton className="h-5 w-full rounded-md bg-gray-200 dark:bg-white/20 " />
          <Skeleton className="h-5 w-3/4 rounded-md bg-gray-200 dark:bg-white/20 " />
          <Skeleton className="h-5 w-4/5 rounded-md bg-gray-200 dark:bg-white/20 " />
        </div>
      </div>
    </section>
  );
};

const ProgressSkeleton = () => {
  return (
    <section
      className="
        rounded-2xl
        border
        border-black/5
        bg-white/60
        p-6
        shadow-sm
        dark:border-white/10
        dark:bg-white/[0.03]
      "
    >
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full bg-gray-200 dark:bg-white/20 " />

          <div className="space-y-2">
            <Skeleton className="h-6 w-44 rounded-md bg-gray-200 dark:bg-white/20 " />
            <Skeleton className="h-4 w-64 rounded-md bg-gray-200 dark:bg-white/20 " />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="ml-auto h-10 w-20 rounded-md bg-gray-200 dark:bg-white/20 " />
          <Skeleton className="ml-auto h-4 w-32 rounded-md bg-gray-200 dark:bg-white/20 " />
        </div>
      </div>

      {/* Progress bar */}
      <Skeleton className="mt-5 h-5 w-full rounded-full bg-gray-200 dark:bg-white/20 " />

      {/* Steps */}
      <div className="mt-8 space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-5"
          >
            {/* circle */}
            <Skeleton className="h-7 w-7 shrink-0 rounded-full bg-gray-200 dark:bg-white/20 " />

            {/* text */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-52 rounded-md bg-gray-200 dark:bg-white/20 " />
              <Skeleton className="h-4 w-[420px] max-w-full rounded-md bg-gray-200 dark:bg-white/20 " />
            </div>

            {/* duration */}
            <Skeleton className="h-4 w-10 rounded-md bg-gray-200 dark:bg-white/20 " />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnalysisSkeleton;