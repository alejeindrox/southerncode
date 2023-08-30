import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

import { MovieService } from '../services/movie.service';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private moviesService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of movies' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':movieId/reviews')
  @ApiOperation({ summary: 'Get reviews from movie' })
  @ApiParam({
    name: 'movieId',
    required: true,
    example: 100,
    description: 'Id of a movie in TMDB API',
    schema: { oneOf: [{ type: 'integer' }] },
  })
  findOneWithReviews(@Param('movieId', ParseIntPipe) movieId: number) {
    return this.moviesService.findOne(movieId);
  }
}
