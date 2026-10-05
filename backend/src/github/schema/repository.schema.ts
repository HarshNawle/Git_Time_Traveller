import z, {} from "zod";

export const githubRepositorySchema = z.object({
    id: z.number(),
    name: z.string(),
    html_url: z.string().url(),
    full_name: z.string(),
    default_brach: z.string(),
    owner: z.object({
        login: z.string()
    }),
});

export type GithubRepository = z.infer<typeof githubRepositorySchema>;
