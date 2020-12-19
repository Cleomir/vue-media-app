import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  validateSync,
} from 'class-validator';

export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  PEXELS_API_KEY: process.env.PEXELS_API_KEY,
  SERVER_PORT: process.env.SERVER_PORT,
  UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
  UNSPLASH_API_SECRET: process.env.UNSPLASH_API_SECRET,
});

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  CLOUDINARY_API_KEY: number;

  @IsNotEmpty()
  @IsString()
  CLOUDINARY_API_SECRET: string;

  @IsNotEmpty()
  @IsString()
  CLOUDINARY_CLOUD_NAME: string;

  @IsNotEmpty()
  @IsString()
  PEXELS_API_KEY: string;

  @IsPositive()
  SERVER_PORT: number;

  @IsNotEmpty()
  @IsString()
  UNSPLASH_API_KEY: string;

  @IsNotEmpty()
  @IsString()
  UNSPLASH_API_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
