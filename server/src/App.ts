import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { resolve } from "path";
import history from "connect-history-api-fallback";
import { v2 } from "cloudinary";

import apiRoutes from "./routes";
import requestLogger from "./middleware/requestLogger";
import { env } from "./config/envVariables";

/**
 * Express instance
 */
const app: Application = express();
const publicPath: string = resolve(__dirname, "../../client/dist");

// global middleware
app.use(
  express.json({
    limit: "25mb",
  })
);
app.use(cors());
app.use(helmet());
app.use(express.static(publicPath));
app.use(requestLogger());

// cloudinary global config
v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// root routes
app.use("/api", apiRoutes);
app.use("/", history());

// 404 handler
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Page not Found",
  });
});

export default app;
