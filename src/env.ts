import { z } from "zod";

declare module "bun" {
  interface Env {
    DATABASE_URL: string;
  }
}

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log(
    `Loading Env failed: ${JSON.stringify(parsedEnv.error.format())}`
  );
  process.exit(0);
}

// env successfully parsed now export it
export const ENV = parsedEnv.data;
