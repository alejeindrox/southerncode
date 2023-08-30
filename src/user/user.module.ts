import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { Review } from '../review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
