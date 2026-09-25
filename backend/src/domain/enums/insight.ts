export const insightSeverities = [
    "low",
    "medium",
    "high",
  ] as const;
  
  export type InsightSeverity =
    (typeof insightSeverities)[number];
  
  
  export const feedbackVotes = [
    "up",
    "down",
  ] as const;
  
  export type FeedbackVote =
    (typeof feedbackVotes)[number];