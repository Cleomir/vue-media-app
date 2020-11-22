/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

import IEnvVariables from "../interfaces/IEnvVariables";

dotenv.config({ path: ".env" });

export const env: IEnvVariables = {
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
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
    if (!key) {
      throw new Error(`Env variable ${key} is undefined`);
    }
  }
};
