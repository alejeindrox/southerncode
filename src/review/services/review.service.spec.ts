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
      tmdbId: faker.number.int({ min: 100, max: 104 }),
      userName: faker.internet.userName(),
    };

    const result = await service.create(newReview);
    const review = result as Review;
    const { movie } = review;

    expect(review).toMatchObject({
      rating: newReview.rating,
      movie: {
        tmdbId: newReview.tmdbId,
      },
      user: {
        username: newReview.userName,
      },
    });
    expect(review).toHaveProperty('movie');
    expect(movie).toHaveProperty('title');
    expect(movie).toHaveProperty('release_date');
    expect(movie).toHaveProperty('poster_path');
    expect(movie).toHaveProperty('overview');
  });

  it('should throw BadRequestException when creating a review with a rating greater than 10 or less than 1', async () => {
    const tmdbId = faker.number.int({ min: 105, max: 109 });

    const newReview = {
      rating: faker.number.int({ min: 11 }),
      tmdbId,
      userName: faker.internet.userName(),
    };

    const newReview2 = {
      rating: faker.number.int({ max: 0 }),
      tmdbId,
      userName: faker.internet.userName(),
    };

    const resultMaxRating = await service.create(newReview);
    const resultMinRating = await service.create(newReview2);

    expect(resultMaxRating).toBeInstanceOf(BadRequestException);
    expect(resultMinRating).toBeInstanceOf(BadRequestException);
  });

  it('should throw BadRequestException when creating a review with the same user and movie', async () => {
    const newReview = {
      rating: faker.number.int({ min: 1, max: 10 }),
      tmdbId: faker.number.int({ min: 110, max: 114 }),
      userName: faker.internet.userName(),
    };

    const resultSuccess = await service.create(newReview);
    const resultError = await service.create(newReview);

    expect(resultSuccess).toBeDefined();
    expect(resultError).toBeInstanceOf(BadRequestException);
  });

  it('should return a list of reviews', async () => {
    const baseReview = {
      rating: faker.number.int({ min: 1, max: 10 }),
      tmdbId: faker.number.int({ min: 115, max: 118 }),
    };

    const newReview = {
      ...baseReview,
      userName: faker.internet.userName(),
    };

    const newReview2 = {
      ...baseReview,
      userName: faker.internet.userName(),
    };

    const newReview3 = {
      ...baseReview,
      userName: faker.internet.userName(),
    };

    await service.create(newReview);
    await service.create(newReview2);
    await service.create(newReview3);
    const result = await service.findAll();

    expect(Array.isArray(result)).toBe(true);
  });
});
