import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { createGraphQLContext } from "./graphql/context.js";

export const createApp = async () => {
  const app = express();

  // Security
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "git-history-time-traveller-api",
    });
  });

  // Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  // GraphQL
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return createGraphQLContext(req);
      },
    })
  );

  return app;
};