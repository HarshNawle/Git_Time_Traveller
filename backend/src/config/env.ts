import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(8091),

  FRONTEND_URL: z.string().url(),

  BACKEND_URL: z.string().url(),

  GITHUB_CLIENT_ID: z.string().min(1),

  GITHUB_CLIENT_SECRET: z.string().min(1),

  GITHUB_CALLBACK_URL: z.string().url(),

  GITHUB_OAUTH_SCOPES: z
    .string()
    .default("read:user user:email"),

  JWT_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);