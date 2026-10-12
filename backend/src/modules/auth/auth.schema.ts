import z from "zod";


export const GitHubOAuthbackSchema = z.object({
    code: z.string().min(1).optional(),
    state: z.string().min(1).optional(),
    
});

export const GitHubTokenResponseSchema = z.object({
    access_token: z.string().min(1),
    token_type: z.string().min(1),
    scope: z.string().optional().default("")
});

export const GitHubProfileSchema = z.object({
    id: z.number().int().positive(),
    login: z.string().min(1),
    name: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    avatar_url: z.string().url(),
});

export const AuthUserSchema = z.object({
    id: z.string().uuid(),
    githubUsername: z.string(),
    displayName: z.string(),
    email: z.string().email().nullable(),
    avatarUrl: z.string().url()
});

export type GitHubProfile = z.infer<
  typeof GitHubProfileSchema
>;

export type GitHubTokenResponse = z.infer<
  typeof GitHubTokenResponseSchema
>;

export type AuthUser = z.infer<
  typeof AuthUserSchema
>;