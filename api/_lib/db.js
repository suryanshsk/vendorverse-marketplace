import { neon } from "@neondatabase/serverless";

export const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
export const sql = hasDatabaseUrl ? neon(process.env.DATABASE_URL) : null;
