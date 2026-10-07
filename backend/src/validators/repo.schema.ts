import z from "zod";

export const RepoUrlSchema = z
    .string()
    .trim()
    .url("Invalid repository URL")
    .refine(
        (url) => {
            const parsed = new URL(url);

            return (
                parsed.protocol === "https:" &&
                ( parsed.hostname === "github.com" || 
                    parsed.hostname === "www.github.com"
                )
            );
        },
        {
            message: "Only public Github HTTPS URLs are allowed",
        }
    );

export const GitHubRepoUrlSchema = RepoUrlSchema.refine(
    (url) => {
        const pathname = new URL(url).pathname.replace(/^\/|\/$/g, "").split("/")

        return pathname.length === 2;
    },
    {
        message: "URL must be in the format https://github.com/owner/repository"
    }
);

export const RepoNameSchema = z
    .string()
    .trim()
    .min(1, "Repository name is required")
    .max(100, "Repository name cannot exceed 100 characters")
    .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Repository name contains invalid characters"
    );

export const RepoOwnerSchema = z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Invalid GitHub username"
    );

export const RepoMetadataSchema = z.object({
    owner: RepoOwnerSchema,
    name: RepoNameSchema,
    url: GitHubRepoUrlSchema,
    defaultBranch: z.string().trim().min(1).max(100).default("main"),

    description: z.string().max(500).optional(),
    stars: z.number().int().min(0).default(0),
    forks: z.number().int().min(0).default(0),
});

export const SubmitRepoSchema = z.object({
    url: GitHubRepoUrlSchema,
});

export const BranchSchema = z
    .string()
    .trim()
    .min(1)
    .max(255)
    .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Invalid branch name"
    );

export const FilePathSchema = z
    .string()
    .trim()
    .min(1)
    .max(500)
    .refine(
        (path) => !path.includes("\0"),
        "Invalid file path"
    )
    .refine(
        (path) => !path.startsWith("/"),
        "Absolute paths are not allowed"
    );

export const PathPatternSchema = z
    .string()
    .trim()
    .max(500)
    .optional();