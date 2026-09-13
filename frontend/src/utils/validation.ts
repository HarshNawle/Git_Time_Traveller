import z, {} from "zod"

export const repositorySchema = z.object({
    url: z
    .string()
    .min(1, "Repository URL is required")
    .url("Enter a valid URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);

          return (
            parsed.hostname === "github.com" &&
            parsed.pathname.split("/").filter(Boolean).length >= 2
          );
        } catch {
          return false;
        }
      },
      {
        message:
          "Enter a valid public GitHub repository URL, e.g. https://github.com/owner/repo",
      }
    ),
})