import z from "zod";

export const analysisJobIdSchema =
  z.object({
    jobId: z.string().uuid(),
  });

  export const analysisProgressSchema =
  z.object({
    progress: z
      .number()
      .int()
      .min(0)
      .max(100),
  });