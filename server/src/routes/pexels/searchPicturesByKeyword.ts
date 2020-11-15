import { Request, Response } from "express";

import logger, { logObject } from "../../logger";
import { env } from "../../config/envVariables";
import axiosRequest from "../../helpers/axios";
import {
  INTERNAL_SERVER_ERROR,
  NO_SEARCH_KEYWORD,
} from "../../config/responseErrorMessages";

/**
 * Search pictures by the given keyword
 * @param req - Request object
 * @param res - Response object
 */
const searchPicturesByKeyword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, query } = req;
  if (
    !query.query ||
    (typeof query.query === "string" && query.query.trim().length === 0)
  ) {
    return res.status(400).json({ success: false, message: NO_SEARCH_KEYWORD });
  }

  const requestParams = {
    query: query.query || "",
    orientation: query.orientation || "portrait",
    page: query.page || 1,
    per_page: query.per_page || 15,
    size: query.size || "small",
  };
  const apiUrl = "https://api.pexels.com/v1/search";
  logger.info(`[NODE][${id}] Request to ${apiUrl}`);

  try {
    const response: Record<string, unknown> = await axiosRequest({
      url: apiUrl,
      method: "GET",
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
      params: requestParams,
    });

    logObject("info", `[NODE][${id}] Response status 200`, response);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logObject("error", "[NODE] Response status 500", error);
    return res
      .status(500)
      .json({ success: false, message: INTERNAL_SERVER_ERROR });
  }
};

export default searchPicturesByKeyword;
