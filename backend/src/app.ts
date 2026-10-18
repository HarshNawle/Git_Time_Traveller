import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

// import { typeDefs } from "./graphql/schema/index.js";
// import { resolvers } from "./graphql/resolvers/index.js";
// import { createGraphQLContext } from "./graphql/context.js";
import { db } from "./db/client.js";
import { users } from "./db/index.js";
import { env } from "./config/env.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRouter from "./modules/auth/auth.routes.js";

export const createApp = async () => {
  const app = express();

  // Security
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  const authLimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
  });

  app.use("/api/auth", authLimiter, authRouter)

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
    });
  });

  // Apollo Server
  // const apolloServer = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  // });

  // await apolloServer.start();

  // GraphQL
  // app.use(
  //   "/graphql",
  //   express.json(),
  //   expressMiddleware(apolloServer, {
  //     context: async ({ req }) => {
  //       return createGraphQLContext(req, { db });
  //     },
  //   })
  // );
  

  return app;
};