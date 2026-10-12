import { Router } from "express";
import { env } from "../../config/env.js";
import { GithubLogout, GithubRefreshToken, githubCallBack, githubOAuth } from "./github-oauth.service.js";


const router = Router();

router.get("/github", githubOAuth);
router.get("/github/callback", githubCallBack);
router.post("/refresh", GithubRefreshToken);
router.post("/logout", GithubLogout);