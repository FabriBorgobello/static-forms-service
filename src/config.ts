import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Define a schema for your environment variables
const envSchema = z.object({
  PORT: z.coerce.number(),
  PGUSER: z.string(),
  PGPASSWORD: z.string(),
  PGDATABASE: z.string(),
  PGHOST: z.string(),
  PGPORT: z.coerce.number(),
  PGSSLMODE: z.enum(['disable', 'require']),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

// This type is inferred from the schema
export type EnvType = z.infer<typeof envSchema>;

// Validate the environment variables
const result = envSchema.safeParse(process.env);
if (!result.success) throw fromZodError(result.error);

export const env = result.data;
