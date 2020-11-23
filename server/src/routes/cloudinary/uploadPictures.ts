import { Request, Response } from "express";
import { UploadApiResponse, v2 } from "cloudinary";

import { logObject } from "../../logger";
import { INTERNAL_SERVER_ERROR } from "../../config/responseErrorMessages";

/**
 *
 * @param req - Request object
 * @param res - Response object
 */
const uploadPictures = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // TODO add base64 validation
  const { id } = req;
  const { files } = req.body;

  try {
    const uploadedFilePromises: Promise<UploadApiResponse>[] = [];
    files.forEach((file: string) => {
      uploadedFilePromises.push(v2.uploader.upload(file));
    });
    const response = await Promise.all(uploadedFilePromises);

    logObject("info", `[NODE]${id} Response status 201`, response);
    return res.status(201).json(response);
  } catch (error) {
    logObject("error", `[NODE]${id} Response status 500`, error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export default uploadPictures;
