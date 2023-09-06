import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

import { testDatabaseOptions } from '../../database/test-database-options';
import { ReviewService } from './review.service';
import { MovieService } from '../../movie/services/movie.service';
import { UserService } from '../../user/services/user.service';

import { Movie } from '../../movie/entities/movie.entity';
import { User } from '../../user/entities/user.entity';
import { Review } from '../entities/review.entity';

dotenv.config();

describe('ReviewService', () => {
  let service: ReviewService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService, MovieService, UserService],
      imports: [
        TypeOrmModule.forRoot(testDatabaseOptions),
        TypeOrmModule.forFeature([Movie, User, Review]),
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a review for movie', async () => {
    const newReview = {
      rating: faker.number.int({ min: 1, max: 10 }),
      tmdbId: faker.number.int({ min: 10000, max: 90000 }),
      userName: faker.internet.userName(),
    };

    const result = await service.create(newReview);
    expect(result).toMatchObject({
      rating: newReview.rating,
      movie: {
        tmdbId: newReview.tmdbId,
      },
      user: {
        username: newReview.userName,
      },
    });
    expect(result).toHaveProperty('movie');
    expect(result.movie).toHaveProperty('title');
    expect(result.movie).toHaveProperty('release_date');
    expect(result.movie).toHaveProperty('poster_path');
    expect(result.movie).toHaveProperty('overview');
  });

  it('error when make a review with a rating greater than 10 or less than 1', async () => {
    const newReview = {
      rating: faker.number.int({ min: 11 }),
      tmdbId: faker.number.int({ min: 10000, max: 90000 }),
      userName: faker.internet.userName(),
    };

    const newReview2 = {
      rating: faker.number.int({ max: 0 }),
      tmdbId: faker.number.int({ min: 10000, max: 90000 }),
      userName: faker.internet.userName(),
    };

    const resultMaxRating = await service.create(newReview);
    const resultMinRating = await service.create(newReview2);

    expect(resultMaxRating).rejects.toBeInstanceOf(BadRequestException);
    expect(resultMinRating).rejects.toBeInstanceOf(BadRequestException);
  });
});
//1 a 999999
//{
//   "rating": 8,
//   "movie": {
//     "tmdbId": 10000,
//     "title": "La estrategia del caracol",
//     "release_date": "1993-12-25T00:00:00.000Z",
//     "poster_path": "/7Slakz6z2I3VJ684FuDP1ZLOQbi.jpg",
//     "overview": "A group of tenants living in an old house are confronted with having to move out due to a renovation project the city has undertaken. The tenants decide to unite and come up with a strategy, but in the process—while the landlord and his aggressive attorney are chasing them—the tenants transform into the opposite of who they once were."
//   },
//   "user": {
//     "username": "John Doe"
//   }
// }
