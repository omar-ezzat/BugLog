import * as z from "zod"

export const postSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(5,"Description must be at least 5 characters" ),
    errorMessage: z.string().optional(),
    codeSnippet: z.string().optional(),
    language: z.string().optional(),
    tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
    status: z.enum(["open", "solved"]).optional(),
    solution: z.string().optional(),
})