import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { resolve } from "path";
import history from "connect-history-api-fallback";

import apiRoutes from "./routes";
import requestLogger from "./middleware/requestLogger";

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
