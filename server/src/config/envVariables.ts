/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const env: { [key: string]: string } = {
  NODE_ENV: process.env.NODE_ENV!,
  SERVER_PORT: process.env.SERVER_PORT!,
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
