import { env } from "../../config/env.js"
import { Request, Response } from "express"
import { type GitHubProfile, GitHubProfileSchema, GitHubTokenResponseSchema, GitHUbOAuthCallbackSchema } from "../../validators/auth.schema.js";
import { createHash, randomBytes } from "crypto";
import { db } from "../../db/client.js";
import { createAccessToken, generateRandomToken, hashToken } from "../../utils/token.utils.js";
import { sessions } from "../../db/schema/sessions.js";
import { users } from "../../db/index.js";
import { and, eq, isNull } from "drizzle-orm";

export const URLSearchCodeForToken = async (
    code: string,
    codeVerifier: string
): Promise<string> => {
    const body = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_url: env.GITHUB_CALLBACK_URL,
        code_verifier: codeVerifier,
    });

    const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
            signal: AbortSignal.timeout(10_000),
        }
    );

    if(!response.ok) {
        throw new Error("GitHub token exchange failed");
    }

    const rawResponse: unknown = await response.json();

    const parseResponse = GitHubTokenResponseSchema.safeParse(rawResponse);

    if(!parseResponse.success) {
        throw new Error("Invalid Github token response")
    }

    return parseResponse.data.access_token;
};

export const getGitHubProfile = async (
    accessToken: string
): Promise<GitHubProfile> => {
    const response = await fetch(
        "https://api.github.com/user",
        {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${accessToken}`,
                "X-GitHub-Api-Version": "2022-11-28"
            },
            signal: AbortSignal.timeout(10_000),
        }
    );

    if(!response.ok) {
        throw new Error("Failed to fetch GitHub profile");
    }

    const rawProfile: unknown = await response.json();
    return GitHubProfileSchema.parse(rawProfile);
}

const OAUTH_STATE_COOKIE = "oauth_state";
const OAUTH_VERIFIER_COOKIE = "oauth_verifier";
const REFRESH_COOKIE = "refreshToken";

const REFRESH_TOKEN_TTL_MS = 30*24*60*60*1000;

const isProduction = env.NODE_ENV === "production";


const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/api/auth"
};

const clearOAuthCookie = (res: Response) => {
    res.clearCookie(OAUTH_STATE_COOKIE, authCookieOptions);
    res.clearCookie(OAUTH_VERIFIER_COOKIE, authCookieOptions);
};

const setRefershCookie = (
    res: Response,
    token: string
) => {
    res.cookie(REFRESH_COOKIE, token, {
        ...authCookieOptions,
        maxAge: REFRESH_TOKEN_TTL_MS,
    });
}

const redirectToLoginWithError = (res : Response) => {
    res.redirect(
        `${env.FRONTEND_URL}/login?error=github_oauth_faild`
    );
}                          

const createPkceChallenge = (verifier: string) => 
    createHash("sha256").update(verifier).digest("base64url");


export const githubOAuth = (
    _req: Request,
    res: Response
) => {
    const state = randomBytes(32).toString("hex");

    const codeVerifier = randomBytes(32).toString("base64url");

    const codeChallenge = createPkceChallenge(codeVerifier);

    res.cookie(OAUTH_STATE_COOKIE, state, {
        ...authCookieOptions,
        maxAge: 10*60*1000,
    });

    const authorizationUrl = new URL(
        "https://github.com/login/oauth/authorize"
    );

    authorizationUrl.searchParams.set(
        "client_id",
        env.GITHUB_CLIENT_ID
    );

    authorizationUrl.searchParams.set(
        "redirect_uri", 
        env.GITHUB_CALLBACK_URL
    );

    authorizationUrl.searchParams.set(
        "scope",
        env.GITHUB_OAUTH_SCOPES
    );

    authorizationUrl.searchParams.set(
        "code_challenge",
        codeChallenge
    );

    res.redirect(authorizationUrl.toString());
};

export const githubCallBack = async (
    req: Request,
    res: Response
) => {
    try {
        const parsedQuery = GitHUbOAuthCallbackSchema.safeParse(req.query);

        if(!parsedQuery.success) {
            clearOAuthCookie(res)
            return redirectToLoginWithError(res);
        }

        const { code, state, error } = parsedQuery.data;

        if(error) {
            clearOAuthCookie(res);
            return redirectToLoginWithError(res);
        }

        const expectedState = req.cookies?.[OAUTH_STATE_COOKIE];

        const codeVerifier = req.cookies?.[OAUTH_VERIFIER_COOKIE];

        const stateMatches = typeof state === "string" &&
        typeof expectedState === "string" &&
        state.length === expectedState.length &&
        Buffer.from(state).equals(Buffer.from(expectedState));

        clearOAuthCookie(res);

        if(!stateMatches || typeof code != "string" || typeof codeVerifier !== "string") {
            return redirectToLoginWithError(res);
        }

        // Exchange authorization code for GitHub access token.
        const githubAccessToken =
        await URLSearchCodeForToken(code, codeVerifier);

        // Retrieve and validate GitHub profile.
        const profile =
            await getGitHubProfile(githubAccessToken);

        // Find an existing user by GitHub's stable numeric ID,
        // or create/update that user.
        const [user] = await db
            .insert(users)
            .values({
            githubId: profile.id,
            githubUsername: profile.login,
            displayName: profile.name ?? profile.login,
            email: profile.email ?? null,
            avatarUrl: profile.avatar_url,
            })
            .onConflictDoUpdate({
            target: users.githubId,

            set: {
                githubUsername: profile.login,
                displayName: profile.name ?? profile.login,
                email: profile.email ?? null,
                avatarUrl: profile.avatar_url,
                updatedAt: new Date(),
            },
            })
            .returning();

        if (!user) {
            throw new Error("Failed to create or retrieve user");
        }

        // Generate an opaque application refresh token.
        const refreshToken = generateRandomToken();

        const refreshTokenHash =
            hashToken(refreshToken);

        const expiresAt = new Date(
            Date.now() + REFRESH_TOKEN_TTL_MS
        );

        // Save only the token hash in the database.
        await db.insert(sessions).values({
            userId: user.id,
            refreshTokenHash,
            expiresAt,
        });

        // The browser receives the token only as an HTTP-only cookie.
        setRefershCookie(res, refreshToken);

        // Do not put access tokens in redirect query parameters.
        return res.redirect(
            `${env.FRONTEND_URL}/auth/callback?login=success`
        );

    } catch (error) {
        // Log the error server-side without logging tokens or secrets.
        console.error("GitHub OAuth callback failed");

        clearOAuthCookie(res);

        return redirectToLoginWithError(res);
    }
};

/**
 * 3. Refresh the application access JWT.
 *
 * The frontend calls this after the OAuth redirect and
 * whenever its short-lived access token expires.
 */
export const GithubRefreshToken = async (
    req: Request, 
    res: Response
) => {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE];
  
    if (
      typeof refreshToken !== "string" ||
      refreshToken.length < 32
    ) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
  
    try {
      const refreshTokenHash =
        hashToken(refreshToken);
  
      const [session] = await db
        .select()
        .from(sessions)
        .where(
          eq(sessions.refreshTokenHash, refreshTokenHash)
        )
        .limit(1);
  
      if (
        !session ||
        session.revokedAt !== null ||
        session.expiresAt.getTime() <= Date.now()
      ) {
        res.clearCookie(REFRESH_COOKIE, authCookieOptions);
  
        return res.status(401).json({
          message: "Invalid or expired session",
        });
      }
  
      const now = new Date();
  
      const nextRefreshToken = generateRandomToken();
  
      const nextRefreshTokenHash =
        hashToken(nextRefreshToken);
  
      const nextExpiresAt = new Date(
        Date.now() + REFRESH_TOKEN_TTL_MS
      );
  
      // Rotate the refresh token atomically.
      const rotated = await db.transaction(async (tx) => {
        const [revokedSession] = await tx
          .update(sessions)
          .set({
            revokedAt: now,
          })
          .where(
            and(
              eq(sessions.id, session.id),
              isNull(sessions.revokedAt)
            )
          )
          .returning({
            id: sessions.id,
          });
  
        if (!revokedSession) {
          return false;
        }
  
        await tx.insert(sessions).values({
          userId: session.userId,
          refreshTokenHash: nextRefreshTokenHash,
          expiresAt: nextExpiresAt,
        });
  
        return true;
      });
  
      if (!rotated) {
        res.clearCookie(REFRESH_COOKIE, authCookieOptions);
  
        return res.status(401).json({
          message: "Session has already been used",
        });
      }
  
      setRefershCookie(res, nextRefreshToken);
  
      const accessToken =
        createAccessToken(session.userId);
  
      return res.status(200).json({
        accessToken,
        expiresIn: 900,
      });
    } catch {
      return res.status(500).json({
        message: "Could not refresh session",
      });
    }
};
  
    /**
    * 4. Log out and revoke the current session.
    */
export const GithubLogout =  async (
    req: Request, 
    res: Response
) => {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE];
  
    try {
      if (typeof refreshToken === "string") {
        const refreshTokenHash =
          hashToken(refreshToken);
  
        await db
          .update(sessions)
          .set({
            revokedAt: new Date(),
          })
          .where(
            and(
              eq(sessions.refreshTokenHash, refreshTokenHash),
              isNull(sessions.revokedAt)
            )
          );
      }
  
      res.clearCookie(REFRESH_COOKIE, authCookieOptions);
  
      return res.status(200).json({
        message: "Logged out successfully",
      });
    } catch {
      res.clearCookie(REFRESH_COOKIE, authCookieOptions);
  
      return res.status(500).json({
        message: "Could not complete logout",
      });
    }
};





