import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const configSchema = z.object({
  port: z.coerce.number().default(4000),
  host: z.string().default('0.0.0.0'),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  jwtAccessSecret: z.string().default('dev-access-secret-change-in-production'),
  jwtAccessTtl: z.string().default('15m'),
})

export const config = configSchema.parse(process.env)