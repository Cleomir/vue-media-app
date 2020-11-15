import express, { Router } from "express";

import searchPicturesByKeyword from "./searchPicturesByKeyword";
import listPictures from "./listPictures";

/**
 * Express router
 */
const router: Router = express.Router();

// mount routes
router.get("/search", searchPicturesByKeyword);
router.get("/pictures", listPictures);

export default router;
