import { z } from 'zod';

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
export const env = envSchema.parse(process.env);
