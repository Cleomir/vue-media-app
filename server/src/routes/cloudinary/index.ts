import express, { Router } from "express";

import uploadPictures from './uploadPictures'

/**
 * Express router
 */
const router: Router = express.Router();

// mount routes
router.post("/upload", uploadPictures);

export default router;
