import express from 'express'
import { config } from './config/index.js'
import { registerMiddleware } from './plugins/index.js'
import { registerGraphQL } from './graphql/index.js'

export async function buildApp() {
  const app = express()

  app.use(express.json())
  
  registerMiddleware(app)
  await registerGraphQL(app)

  return app
}