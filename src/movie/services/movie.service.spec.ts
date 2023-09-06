import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { testDatabaseOptions } from '../../database/test-database-options';
import { MovieService } from './movie.service';

import { Movie } from '../entities/movie.entity';

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
});
