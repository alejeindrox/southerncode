import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsInt, Min } from 'class-validator';

export class CreateMovieDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ description: 'Id from tmdb for movie' })
  readonly tmdbId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "movie's title" })
  readonly title: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'release date of movie' })
  readonly release_date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'main image of movie' })
  readonly poster_path: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'movie subject summary' })
  readonly overview: string;
}
