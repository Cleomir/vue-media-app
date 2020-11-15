import { Request, Response } from "express";

/**
 *
 * @param req - Request object
 * @param res - Response object
 */
const listUploadedPictures = (req: Request, res: Response): Response => {
  return res.status(200).send("Cloudinary list uploaded pictures");
};

export default listUploadedPictures;
