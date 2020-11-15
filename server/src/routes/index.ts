import express, { Router } from "express";

import cloudinaryRoutes from "./cloudinary";
import pexelsRoutes from "./pexels";
import unsplashRoutes from "./unsplash";

/**
 * Express router
 */
const router: Router = express.Router();

// Mount /api routes
router.use("/cloudinary", cloudinaryRoutes);
router.use("/pexels", pexelsRoutes);
router.use("/unsplash", unsplashRoutes);

export default router;
