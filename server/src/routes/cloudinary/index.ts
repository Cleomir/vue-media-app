import express, { Router } from "express";

import uploadPictures from "./uploadPictures";
import listUploadedPictures from "./listUploadedPictures";

/**
 * Express router
 */
const router: Router = express.Router();

// mount routes
router.post("/upload", uploadPictures);
router.get("/", listUploadedPictures);

export default router;
