import { Request, Response } from "express";

import logger, { logObject } from "../../logger";
import { env } from "../../config/envVariables";
import axiosRequest from "../../helpers/axios";
import { INTERNAL_SERVER_ERROR } from "../../config/responseErrorMessages";
import { ValidationResult } from "joi";
import RequestValidator from "../../validation/RequestValidator";

/**
 * List Pictures
 * @param req - Request object
 * @param res - Response object
 */
const listPictures = async (req: Request, res: Response): Promise<Response> => {
  // validate request
  const { id, query } = req;
  const requestParams = {
    page: query.page || 1,
    per_page: query.per_page || 10,
  };
  const validation: ValidationResult = RequestValidator.validateListParams(
    requestParams.page as number,
    requestParams.per_page as number
  );
  if (validation.error) {
    logger.error(`[NODE][${req.id}] Response status 400`);
    return res.status(400).json({ message: validation.error.message });
  }

  // send request to Unsplash
  const apiUrl = "https://api.unsplash.com/photos";
  logger.info(`[NODE][${id}] Request to ${apiUrl}`);
  try {
    const response: Record<string, unknown> = await axiosRequest({
      url: apiUrl,
      method: "GET",
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${env.UNSPLASH_API_KEY}`,
      },
      params: requestParams,
    });

    logObject("info", `[NODE][${id}] Response status 200`, response);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logObject("error", `[NODE][${id}] Response status 500`, error);
    return res
      .status(500)
      .json({ success: false, message: INTERNAL_SERVER_ERROR });
  }
};

export default listPictures;
