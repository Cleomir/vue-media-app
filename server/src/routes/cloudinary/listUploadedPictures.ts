import { Request, Response } from "express";
import { v2 } from "cloudinary";

import { INTERNAL_SERVER_ERROR } from "../../config/responseErrorMessages";
import logger, { logObject } from "../../logger";
import { ValidationResult } from "joi";
import RequestValidator from "../../validation/RequestValidator";

/**
 * List uploaded pictures to Cloudinary
 * @param req - Request object
 * @param res - Response object
 */
const listUploadedPictures = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req;
  const { next_cursor } = req.query;
  try {
    const validation: ValidationResult = RequestValidator.validateCloudinaryListUploadedPictures(
      next_cursor as string
    );
    if (validation.error) {
      logger.error(`[NODE][${req.id}] Response status 400`);
      return res.status(400).json({ message: validation.error.message });
    }

    const response = await v2.api.resources({ next_cursor });

    logObject("info", `[NODE][${id}] Response status 200`, response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export default listUploadedPictures;
