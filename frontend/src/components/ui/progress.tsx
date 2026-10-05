import { cn } from "cn"

function Progress({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<"div"> & { value?: number }) {
  return (
    <div
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator value={value} />
      </ProgressTrack>
    </div>
  )
}

function ProgressTrack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & { value?: number }) {
  return (
    <div
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      style={{ width: `${value ?? 0}%` }}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}