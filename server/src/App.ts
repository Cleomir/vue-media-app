import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import { resolve } from "path";
import history from "connect-history-api-fallback";

import apiRoutes from "./routes";

/**
 * Express instance
 */
const app: Application = express();
const publicPath: string = resolve(__dirname, "../../client/dist");

// global middleware
app.use(express.json());
app.use(helmet());
app.use(express.static(publicPath));

// root routes
app.use("/", history());
app.use("/api", apiRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Page not Found",
  });
});

export default app;
