import { Request, Response } from "express";

/**
 *
 * @param req - Request object
 * @param res - Response object
 */
const searchPicturesByKeyword = (req: Request, res: Response): Response => {
  return res.status(200).send("Unsplash search pictures");
};

export default searchPicturesByKeyword;
