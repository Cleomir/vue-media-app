import { Request, Response } from "express";
import { ValidationResult } from "joi";

import logger, { logObject } from "../../logger";
import { env } from "../../config/envVariables";
import axiosRequest from "../../helpers/axios";
import { INTERNAL_SERVER_ERROR } from "../../config/responseErrorMessages";
import RequestValidator from "../../validation/RequestValidator";

/**
 * Search pictures by the given keyword
 * @param req - Request object
 * @param res - Response object
 */
const searchPicturesByKeyword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // validate request
  const { id, query } = req;
  const requestParams = {
    query: query.query,
    page: query.page || 1,
    pexels_next_page: query.pexels_next_page,
  };
  const validation: ValidationResult = RequestValidator.validatePexelsSearchRequest(
    requestParams.query as string,
    requestParams.page as number,
    requestParams.pexels_next_page as string
  );
  if (validation.error) {
    logger.error(`[NODE][${req.id}] Response status 400`);
    return res.status(400).json({ message: validation.error.message });
  }

  // send request to Pexels
  const apiUrl = requestParams.pexels_next_page
    ? (requestParams.pexels_next_page as string)
    : "https://api.pexels.com/v1/search";
  logger.info(`[NODE][${id}] Request to ${apiUrl}`);
  try {
    const response: Record<string, unknown> = await axiosRequest({
      url: apiUrl,
      method: "GET",
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
      params: requestParams.pexels_next_page ? undefined : requestParams,
    });

    logObject("info", `[NODE][${id}] Response status 200`, response);
    return res.status(200).json(response);
  } catch (error) {
    logObject("error", "[NODE] Response status 500", error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export default searchPicturesByKeyword;
