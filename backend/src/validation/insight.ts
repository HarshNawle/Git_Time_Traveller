import z from "zod";

export const feedbackVoteSchema =
  z.enum([
    "up",
    "down",
  ]);

export const submitInsightFeedbackSchema =
  z.object({
    insightId:
      z.string().uuid(),

    vote:
      feedbackVoteSchema,
  });