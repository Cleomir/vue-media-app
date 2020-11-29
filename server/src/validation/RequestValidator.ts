import Joi, { ValidationResult } from "joi";

/**
 * Validate request parameters
 */
export default class RequestValidator {
  private static query = Joi.string().trim().min(1);
  private static page = Joi.number().min(1);
  private static cloudinaryNextCursor = Joi.string().min(64).max(64);
  private static unsplashNextPageUrlPattern = Joi.string().pattern(
    /^https:\/\/api\.unsplash\.com\/search\/photos/
  );
  private static pexelsNextPageUrlPattern = Joi.string().pattern(
    /^https:\/\/api\.pexels\.com\/v1\/search\//
  );
  private static baseSearchParamsValidation = {
    query: RequestValidator.query,
    page: RequestValidator.page,
  };

  /**
   * Validate Unsplash search pictures parameters
   * @param query keyword to be searched
   * @param page page number
   */
  public static validateUnsplashSearchRequest(
    query: string,
    page: number,
    unsplashNextPageUrl?: string
  ): ValidationResult {
    return Joi.object({
      ...this.baseSearchParamsValidation,
      unsplashNextPageUrl: this.unsplashNextPageUrlPattern,
    })
      .or("query", "unsplashNextPageUrl")
      .validate({
        query,
        page,
        unsplashNextPageUrl: unsplashNextPageUrl,
      });
  }

  /**
   * Validate Pexels search pictures parameters
   * @param query keyword to be searched
   * @param page page number
   */
  public static validatePexelsSearchRequest(
    query: string,
    page: number,
    pexelsNextPageUrl?: string
  ): ValidationResult {
    return Joi.object({
      ...this.baseSearchParamsValidation,
      pexelsNextPageUrl: this.pexelsNextPageUrlPattern,
    })
      .or("query", "pexelsNextPageUrl")
      .validate({
        query,
        page,
        pexelsNextPageUrl: pexelsNextPageUrl,
      });
  }

  public static validateCloudinaryListUploadedPictures(
    nextCursor: string
  ): ValidationResult {
    return this.cloudinaryNextCursor.validate(nextCursor);
  }
}
