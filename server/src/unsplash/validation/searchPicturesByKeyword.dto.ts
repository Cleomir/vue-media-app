import { IsNotEmpty, IsString, IsOptional, Min } from 'class-validator';

export class SearchPicturesByKeywordDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsOptional()
  @Min(1)
  page: number;

  @IsOptional()
  @IsString()
  unsplashNextPage: string;
}
