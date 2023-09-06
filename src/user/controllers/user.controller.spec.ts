import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { testDatabaseOptions } from '../../database/test-database-options';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

import { User } from '../entities/user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot(testDatabaseOptions),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
