import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { testDatabaseOptions } from '../../database/test-database-options';
import { ReviewController } from './review.controller';
import { ReviewService } from '../services/review.service';
import { MovieService } from '../../movie/services/movie.service';
import { UserService } from '../../user/services/user.service';

import { Movie } from '../../movie/entities/movie.entity';
import { User } from '../../user/entities/user.entity';
import { Review } from '../entities/review.entity';

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService, MovieService, UserService],
      imports: [
        TypeOrmModule.forRoot(testDatabaseOptions),
        TypeOrmModule.forFeature([Movie, User, Review]),
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
