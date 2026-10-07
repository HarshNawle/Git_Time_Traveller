import crypto from "node:crypto";
import type { Request, Response } from "express";

const GITHUB_AUTHORIZE_URL =
  "https://github.com/login/oauth/authorize";

const GITHUB_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

const GITHUB_USER_URL =
  "https://api.github.com/user";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

/**
 * Generate a cryptographically secure random string.
 */
function generateRandomString(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("base64url");
}

/**
 * Generate PKCE code challenge from verifier.
 */
function generateCodeChallenge(verifier: string): string {
  return crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
}

/**
 * Start GitHub authentication.
 */
export function startGithubAuth(
  req: Request,
  res: Response
): void {
  const clientId = getRequiredEnv("GITHUB_CLIENT_ID");
  const callbackUrl = getRequiredEnv("GITHUB_CALLBACK_URL");

  const state = generateRandomString();
  const codeVerifier = generateRandomString();

  const codeChallenge = generateCodeChallenge(codeVerifier);

  /**
   * Store OAuth security values temporarily.
   *
   * httpOnly:
   * JavaScript in the browser cannot read them.
   *
   * secure:
   * Only HTTPS in production.
   *
   * sameSite:
   * Helps protect against CSRF.
   */
  res.cookie("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("github_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const authorizationUrl =
    `${GITHUB_AUTHORIZE_URL}?${params.toString()}`;

  res.redirect(authorizationUrl);
}

/**
 * Exchange GitHub authorization code for a user access token.
 */
async function exchangeCodeForToken(
  code: string,
  codeVerifier: string
) {
  const clientId = getRequiredEnv("GITHUB_CLIENT_ID");
  const clientSecret = getRequiredEnv("GITHUB_CLIENT_SECRET");
  const callbackUrl = getRequiredEnv("GITHUB_CALLBACK_URL");

  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `GitHub token exchange failed: ${
        data?.error_description ?? data?.error ?? "Unknown error"
      }`
    );
  }

  if (!data.access_token) {
    throw new Error("GitHub did not return an access token");
  }

  return data;
}

/**
 * Get authenticated GitHub user.
 */
async function getGithubUser(accessToken: string) {
  const response = await fetch(GITHUB_USER_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch GitHub user: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Handle GitHub OAuth callback.
 */
export async function handleGithubCallback(
  req: Request,
  res: Response
): Promise<void> {
  const { code, state, error } = req.query;

  if (error) {
    res.status(400).json({
      message: "GitHub authorization was denied",
      error,
    });

    return;
  }

  if (
    typeof code !== "string" ||
    typeof state !== "string"
  ) {
    res.status(400).json({
      message: "Invalid GitHub callback",
    });

    return;
  }

  const savedState = req.cookies.github_oauth_state;
  const codeVerifier = req.cookies.github_code_verifier;

  /**
   * Validate OAuth state.
   */
  if (!savedState || state !== savedState) {
    res.status(400).json({
      message: "Invalid OAuth state",
    });

    return;
  }

  /**
   * PKCE verifier must exist.
   */
  if (!codeVerifier) {
    res.status(400).json({
      message: "Missing PKCE verifier",
    });

    return;
  }

  /**
   * Remove temporary OAuth cookies.
   */
  res.clearCookie("github_oauth_state");
  res.clearCookie("github_code_verifier");

  try {
    /**
     * Exchange authorization code
     * for GitHub user access token.
     */
    const tokenData = await exchangeCodeForToken(
      code,
      codeVerifier
    );

    const accessToken = tokenData.access_token;

    /**
     * Get GitHub account information.
     */
    const githubUser = await getGithubUser(accessToken);

    /**
     * IMPORTANT:
     *
     * Do NOT send accessToken to frontend.
     *
     * Next step:
     * Save/update user + encrypted token
     * in PostgreSQL.
     */

    console.log("GitHub user:", {
      id: githubUser.id,
      login: githubUser.login,
      name: githubUser.name,
    });

    res.redirect(
      `${getRequiredEnv("FRONTEND_URL")}/auth/success`
    );
  } catch (error) {
    console.error("GitHub authentication error:", error);

    res.status(500).json({
      message: "GitHub authentication failed",
    });
  }
}