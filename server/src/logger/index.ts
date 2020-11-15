import winston from "winston";
import { TransformableInfo } from "logform";
import DailyRotateFile from "winston-daily-rotate-file";
import { inspect } from "util";

import { env } from "../config/envVariables";

const { format } = winston;
/**
 * Log lines format
 */
const logFormat = format.printf(
  (info: TransformableInfo) =>
    `${info.timestamp}.${info.level.toUpperCase()}: ${info.message}`
);

/**
 * Log file settings
 */
const rotator = new DailyRotateFile({
  datePattern: "YYYY-MM-DD",
  dirname: "logs",
  filename: "log-%DATE%.log",
  maxFiles: "30d",
  maxSize: "50m",
});

/**
 * Logger instance
 */
const logger = winston.createLogger({
  exceptionHandlers: [rotator],
  format: format.combine(format.timestamp(), logFormat),
  transports: [rotator],
});

logger.exitOnError = false;

// Also send logs to console in Dev
if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

/**
 * Logs and beautifies objects
 * @param level Log level
 * @param message Log message
 * @param object Object to be logged
 */
export const logObject = (
  level: "info" | "warn" | "error",
  message: string,
  object: Record<string, unknown>
): void => {
  if (level === "info") {
    logger.info(`${message} ${inspect(object, { depth: null })}`);
  } else if (level === "warn") {
    logger.warn(`${message} ${inspect(object, { depth: null })}`);
  } else {
    logger.error(`${message} ${inspect(object, { depth: null })}`);
  }
};

export default logger;
