import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

import { Review } from '../../review/entities/review.entity';

@Entity({ name: 'movies' })
@Index(['tmdbId'])
export class Movie {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  @IsInt()
  @Min(1)
  tmdbId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'date' })
  release_date: Date;

  @Column({ type: 'varchar' })
  poster_path: string;

  @Column({ type: 'text' })
  overview: string;

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

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
