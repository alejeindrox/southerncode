import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { Movie } from './entities/movie.entity';
import { Review } from '../review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
