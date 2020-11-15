/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const env: { [key: string]: string } = {
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  NODE_ENV: process.env.NODE_ENV!,
  PEXELS_API_KEY: process.env.PEXELS_API_KEY!,
  SERVER_PORT: process.env.SERVER_PORT!,
  UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY!,
  UNSPLASH_API_SECRET: process.env.UNSPLASH_API_SECRET!,
};

/**
 * Check if all env variables are defined, otherwise an error is thrown
 */
export const checkForUndefinedEnvVariables = (): void => {
  for (const key in env) {
    if (!env[key]) {
      throw new Error(`Env variable ${key} is undefined`);
    }
  }
};
