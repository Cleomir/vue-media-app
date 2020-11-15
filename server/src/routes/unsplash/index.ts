import express, { Router } from "express";

import searchPicturesByKeyword from './searchPicturesByKeyword'

/**
 * Express router
 */
const router: Router = express.Router();

// mount routes
router.get("/search", searchPicturesByKeyword);

export default router;
