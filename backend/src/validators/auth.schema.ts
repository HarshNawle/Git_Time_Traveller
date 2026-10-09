import z from "zod";

export const GitHUbOAuthCallbackSchema = z.object({
    code: z.string().trim().min(1, "OAuth code is required"),
    state: z.string().trim().min(1, "OAuth code is required").optional(),
});

export const LoginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
})

export const RefreshTokenSchema = z.object({
    refreshToken: z.string().trim().min(1, "Refresh token is required")
});

export const LogoutSchema = z.object({
    refreshToken: z.string().trim().min(1, "Refresh token is required")
});

export const AuthUserIdSchema = z.object({
    userId: z.string().uuid("Invalid user ID")
});

export const AuthUserSchema = z.object({
    id: z.string().uuid(),
    githubId: z.string().min(1),
    username: z.string().min(1).max(100),
    email: z.string().email().nullable(),
    avatarUrl: z.string().url().nullable(),
});

export const JWTPayloadSchema = z.object({
    userId: z.string().uuid(),
    githubId: z.string().min(1),
    iat: z.number().optional(),
    exp: z.number().optional(),
});

export const GitHubTokenResponseSchema = z.object({
    access_token: z.string().min(1),
    token_type: z.string().min(1),
    scope: z.string().optional(),
});

export const GitHubProfileSchema = z.object({
    id: z.number().int().positive(),
    login: z.string().min(1).max(100),
    email: z.string().email().nullable(),
    avatar_url: z.string().url().nullable(),
    name: z.string().max(100).nullable(),
});

export const UpdateProfileSchema = z.object({
    username: z.string().trim().min(3).max(100).regex(/^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, _ and -"
      ).optional(),
    avatarUrl: z.string().url("Invalid avatar URL").optional(),
});


