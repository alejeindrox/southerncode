import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { testDatabaseOptions } from '../../database/test-database-options';
import { UserService } from './user.service';

import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot(testDatabaseOptions),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
