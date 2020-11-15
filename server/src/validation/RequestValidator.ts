import Joi, { ValidationResult } from "joi";

export default class RequestValidator {
  private static query = Joi.string().trim().min(1).required();
  private static page = Joi.number().min(1);
  private static perPage = Joi.number().min(1).max(80);

  public static validateSearchParams(
    query: string,
    page: number,
    perPage: number
  ): ValidationResult {
    return Joi.object({
      query: this.query,
      page: this.page,
      per_page: this.perPage,
    }).validate({ query, page, per_page: perPage });
  }

  public static validateListParams(
    page: number,
    perPage: number
  ): ValidationResult {
    return Joi.object({
      page: this.page,
      per_page: this.perPage,
    }).validate({ page, per_page: perPage });
  }
}
