import z from "zod";

export const exportFormatSchema =
  z.enum([
    "gif",
    "webm",
  ]);

export const exportScopeSchema =
  z.enum([
    "filtered",
    "full",
  ]);

export const exportRequestSchema =
  z.object({
    format:
      exportFormatSchema,

    scope:
      exportScopeSchema,
  });