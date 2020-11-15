import express, { Router } from "express";

import uploadPicture from './uploadPicture'

/**
 * Express router
 */
const router: Router = express.Router();

// mount routes
router.post("/upload", uploadPicture);

export default router;
