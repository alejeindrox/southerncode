import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

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

  it('should create a user when does not exist', async () => {
    const user = { username: faker.internet.userName() };

    const result = await service.createIfNotExist(user);

    expect(result).toHaveProperty('username');
  });

  it('should return a list of users', async () => {
    const user = { username: faker.internet.userName() };
    const user2 = { username: faker.internet.userName() };
    const user3 = { username: faker.internet.userName() };

    await service.createIfNotExist(user);
    await service.createIfNotExist(user2);
    await service.createIfNotExist(user3);

    const result = await service.findAll();

    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a user using username', async () => {
    const user = { username: faker.internet.userName() };

    await service.createIfNotExist(user);
    const result = await service.findOne(user.username);

    expect(result.username).toBe(user.username);
  });
});
