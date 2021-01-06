import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class SearchPicturesByKeywordDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsOptional()
  @Min(1)
  page: number;

  @IsOptional()
  @IsString()
  pexelsNextPage: string;
}
