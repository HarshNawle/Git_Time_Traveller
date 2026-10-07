import z from "zod";


export const UUIDSchema = z.string().uuid();

export type UUID = z.infer<typeof UUIDSchema>;

export const IDSchema = z.string().trim().min(1, "ID is required").max(100, "ID is too long");

export const DateSchema = z.coerce.date();

export const DateRangeSchema = z.object({
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional(),
})
.refine(
    (data) => {
        if(!data.dateFrom || !data.dateTo) return true;
        return data.dateFrom <= data.dateTo;
    },
    {
        message: "dateFrom must be before dateTo",
        path: ["dateTo"],
    }
);

export const PageInputSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20),
})

