import type { Request } from "express";
import { ServiceContainer } from "../services/container.js";

export interface GraphQLContext {
  request: Request;
  services: ServiceContainer
}

export const createGraphQLContext = (
  request: Request,
  services: ServiceContainer
): GraphQLContext => {
  return {
    request,
    services
  };
};