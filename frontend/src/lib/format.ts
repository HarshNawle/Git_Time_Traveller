export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  }

  if (value >= 10_000) {
    return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1).replace(/\.0$/, "")}k`;
  }

  return value.toLocaleString("en-US");
}

export function formatRelativeUpdated(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60_000));

  if (minutes < 60) return `Updated ${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.round(hours / 24);
  if (days < 14) return `Updated ${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.round(days / 7);
  if (weeks < 8) return `Updated ${weeks} week${weeks === 1 ? "" : "s"} ago`;

  const months = Math.round(days / 30);
  return `Updated ${months} month${months === 1 ? "" : "s"} ago`;
}

export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
};

export function languageColor(language: string | null) {
  if (!language) return "#94a3b8";
  return languageColors[language] ?? "#64748b";
}
