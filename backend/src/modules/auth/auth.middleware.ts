import type {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    verifyAccessToken,
  } from "../../utils/token.utils.js";
  
  declare global {
    namespace Express {
      interface Request {
        auth?: {
          userId: string;
        };
      }
    }
  }

  // This middleware verifies the application
  //  JWT, not the GitHub access token.
  
  export function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorization =
      req.headers.authorization;
  
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
  
    const token = authorization.slice(7);
  
    try {
      const userId = verifyAccessToken(token);
  
      req.auth = { userId };
  
      return next();
    } catch {
      return res.status(401).json({
        message: "Invalid or expired access token",
      });
    }
  }