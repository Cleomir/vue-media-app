import { Request, Response } from "express";
import { v2 } from "cloudinary";

import { INTERNAL_SERVER_ERROR } from "../../config/responseErrorMessages";
import { logObject } from "../../logger";

/**
 * List 
 * @param req - Request object
 * @param res - Response object
 */
const listUploadedPictures = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req;
  try {
    const response = await v2.api.resources();

    logObject("info", `[NODE][${id}] Response status 200`, response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export default listUploadedPictures;
