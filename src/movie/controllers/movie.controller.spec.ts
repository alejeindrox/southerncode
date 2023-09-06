import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { testDatabaseOptions } from '../../database/test-database-options';
import { MovieController } from './movie.controller';
import { MovieService } from '../services/movie.service';

import { Movie } from '../entities/movie.entity';

describe('MovieController', () => {
  let controller: MovieController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
      imports: [
        TypeOrmModule.forRoot(testDatabaseOptions),
        TypeOrmModule.forFeature([Movie]),
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
