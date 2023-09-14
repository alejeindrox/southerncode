import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating cannot exceed 10' })
  @IsNotEmpty()
  @ApiProperty({
    example: 8,
    description: 'rating of movie (1-10)',
    minimum: 1,
    maximum: 10,
  })
  readonly rating: number;

  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ example: 100, description: 'ID of a movie in TMDB' })
  readonly tmdbId: number;

  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', description: 'name of user for review' })
  readonly userName: string;
}
