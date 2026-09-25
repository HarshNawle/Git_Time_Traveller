import { z } from "zod";

export const githubRepositoryUrlSchema =
  z
    .string()
    .url()
    .refine((value) => {
      const url = new URL(value);

      return (
        url.hostname === "github.com" ||
        url.hostname === "www.github.com"
      );
    }, {
      message:
        "Must be a valid GitHub repository URL",
    });

    export const submitRepoSchema =
    z.object({
      url: githubRepositoryUrlSchema,
    });

    export const repoFilterSchema =
  z.object({
    dateFrom:
      z.coerce.date().optional(),

    dateTo:
      z.coerce.date().optional(),

    authors:
      z.array(
        z.string().min(1)
      ).optional(),

    pathPattern:
      z.string()
       .max(500)
       .optional(),

    branch:
      z.string()
       .min(1)
       .max(255)
       .optional(),
  })
  .refine(
    (data) => {
      if (
        !data.dateFrom ||
        !data.dateTo
      ) {
        return true;
      }

      return (
        data.dateFrom <=
        data.dateTo
      );
    },
    {
      message:
        "dateFrom must be before dateTo",

      path: ["dateFrom"],
    }
  );