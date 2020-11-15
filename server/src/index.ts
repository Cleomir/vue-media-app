import app from "./App";
import { env, checkForUndefinedEnvVariables } from "./config/envVariables";
import logger from "./logger";

(async () => {
  const serverPort: number = +env.SERVER_PORT;

  checkForUndefinedEnvVariables();
  logger.info("[NODE] Env variables initialized");
  app.listen(serverPort, () =>
    logger.info(`[NODE] Started on port {${serverPort}}`)
  );
})();
