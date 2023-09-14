import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

import { Movie } from '../../movie/entities/movie.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'reviews' })
@Unique(['movie', 'user'])
export class Review {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  @IsInt()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating cannot exceed 10' })
  rating: number;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
