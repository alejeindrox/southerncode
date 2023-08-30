import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  findAll() {
    return this.usersRepo.find();
  }

  async findOne(name: string) {
    const username = decodeURIComponent(name);
    const user = await this.usersRepo.findOne({
      where: { username },
      relations: ['reviews', 'reviews.movie'],
    });

    if (!user) {
      throw new NotFoundException(`The user: ${username} not found`);
    }

    return user;
  }

  async createIfNotExist(data: CreateUserDto) {
    const userDB = await this.usersRepo.findOne({
      where: { username: data.username },
    });

    if (userDB) return userDB;

    const newUser = this.usersRepo.create({ username: data.username });
    return this.usersRepo.save(newUser);
  }
}
