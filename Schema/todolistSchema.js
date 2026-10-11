import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(100),
  body: z.string().max(500).optional(),
});