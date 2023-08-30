import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { MovieService } from '../movie/services/movie.service';
import { UserService } from '../user/services/user.service';
import { Review } from './entities/review.entity';
import { Movie } from '../movie/entities/movie.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Movie, User])],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService, UserService],
})
export class ReviewModule {}
