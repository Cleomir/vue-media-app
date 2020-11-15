import { Request, Response } from "express";

/**
 *
 * @param req - Request object
 * @param res - Response object
 */
const uploadPicture = (req: Request, res: Response): Response => {
  return res.status(200).send("Cloudinary upload picture");
};

export default uploadPicture;
