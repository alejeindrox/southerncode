import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

import { testDatabaseOptions } from '../../database/test-database-options';
import { MovieService } from './movie.service';

import { Movie } from '../entities/movie.entity';

dotenv.config();

describe('MovieService', () => {
  let service: MovieService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
      imports: [
        TypeOrmModule.forRoot(testDatabaseOptions),
        TypeOrmModule.forFeature([Movie]),
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movie when does not exist', async () => {
    const tmdbId = faker.number.int({ min: 120, max: 122 });

    const result = await service.createIfNotExist(tmdbId);

    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('release_date');
    expect(result).toHaveProperty('poster_path');
    expect(result).toHaveProperty('overview');
  });

  it('should return a list of movies', async () => {
    const tmdbId = faker.number.int({ min: 123, max: 129 });
    const tmdbId2 = faker.number.int({ min: 123, max: 129 });
    const tmdbId3 = faker.number.int({ min: 123, max: 129 });

    await service.createIfNotExist(tmdbId);
    await service.createIfNotExist(tmdbId2);
    await service.createIfNotExist(tmdbId3);

    const result = await service.findAll();

    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a movie using tmdbId', async () => {
    const tmdbId = faker.number.int({ min: 132, max: 140 });

    await service.createIfNotExist(tmdbId);
    const result = await service.findOne(tmdbId);

    expect(result.tmdbId).toBe(tmdbId);
  });
});
