import { Router } from "express";
import { GithubLogout, GithubMe, GithubRefreshToken, githubCallBack, githubOAuth } from "./github-oauth.service.js";
import { requireAuth } from "./auth.middleware.js";

const authRouter = Router();

authRouter.get("/github", githubOAuth);
authRouter.get("/github/callback", githubCallBack);
authRouter.post("/refresh", GithubRefreshToken);
authRouter.post("/logout", GithubLogout);
authRouter.get("/me", requireAuth, GithubMe);

export default authRouter;