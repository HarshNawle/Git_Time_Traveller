import * as React from "react"
import { cn } from "cn"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: React.ComponentProps<"div"> & {
  defaultValue?: number | number[]
  value?: number | number[]
  min?: number
  max?: number
  step?: number
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <div
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      data-orientation="horizontal"
      {...props}
    >
      <div className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50">
        <div
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1 data-horizontal:w-full"
        >
          <div
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
            style={{
              width: `${((_values[0] - min) / (max - min)) * 100}%`,
              left: `${((_values[0] - min) / (max - min)) * 100}%`,
            }}
          />
        </div>
        {_values.map((val, index) => (
          <div
            key={index}
            data-slot="slider-thumb"
            className="relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
            style={{
              left: `${((val - min) / (max - min)) * 100}%`,
            }}
            tabIndex={0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
          />
        ))}
      </div>
    </div>
  )
}

export { Slider }