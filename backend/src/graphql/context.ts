import type { Request } from "express";
import { db } from "../db/client.js";

export interface GraphQLContext {
  request: Request;
  db: typeof db;
}

export const createGraphQLContext = (
  request: Request,
  services: { db: typeof db }
): GraphQLContext => {
  return {
    request,
    db: services.db
  };
};