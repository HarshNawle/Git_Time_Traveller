import type { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { config } from '../config/index.js'

export function registerMiddleware(app: Express) {
  app.use(helmet())
  app.use(cors({ origin: true, credentials: true }))
  app.use(cookieParser())
  app.use(rateLimit({ max: 100, windowMs: 60_000 }))
}