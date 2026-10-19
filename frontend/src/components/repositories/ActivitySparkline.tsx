interface ActivitySparklineProps {
  values: number[];
  color?: string;
}

export default function ActivitySparkline({
  values,
  color = "#7C6CF0",
}: ActivitySparklineProps) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-8 items-end gap-[3px]" aria-hidden>
      {values.map((value, index) => (
        <span
          key={index}
          className="w-[3px] rounded-full"
          style={{
            height: `${Math.max(18, (value / max) * 100)}%`,
            backgroundColor: color,
            opacity: 0.45 + (value / max) * 0.55,
          }}
        />
      ))}
    </div>
  );
}
