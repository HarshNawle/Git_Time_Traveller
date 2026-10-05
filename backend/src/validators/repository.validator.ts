import z, {} from "zod";

export const repositoryInputSchema = z.object({
    url: z.
    string().
    trim().
    url("Invalid repository URL").
    refine((url) => url.startsWith("https://github.com/"), 
    "Only Github repository URLs are supported")
});

export type RepositoryInput = z.infer<typeof repositoryInputSchema>;