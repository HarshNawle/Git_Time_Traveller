import type { Express } from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { buildSchema } from 'graphql'
import { config } from '../config/index.js'

const schema = buildSchema(/* GraphQL */ `
  type Query {
    health: String!
  }
`)

const root = {
  health: () => 'OK',
}

export async function registerGraphQL(app: Express) {
  app.all(
    '/graphql',
    createHandler({
      schema,
      rootValue: root,
    })
  )
}