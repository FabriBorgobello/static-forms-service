import { z } from "zod";

export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  hash: z.union([z.string(), z.null()]),
  salt: z.union([z.string(), z.null()]),
  google_id: z.union([z.string(), z.null()]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export const DB = z.object({
  user: User,
})
