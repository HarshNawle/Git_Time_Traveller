import type { Request } from "express";

export interface GraphQLContext {
  request: Request;
}

export const createGraphQLContext = (
  request: Request
): GraphQLContext => {
  return {
    request,
  };
};