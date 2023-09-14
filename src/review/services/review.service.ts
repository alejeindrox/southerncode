import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from '../entities/review.entity';
import { MovieService } from '../../movie/services/movie.service';
import { UserService } from '../../user/services/user.service';
import { CreateReviewDto } from '../dtos';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewsRepo: Repository<Review>,

    private movieService: MovieService,
    private userService: UserService,
  ) {}

  async findAll() {
    const reviews = await this.reviewsRepo.find({
      relations: ['user', 'movie'],
    });
    const transformedReviews = reviews.map((item) => ({
      rating: item.rating,
      username: item.user.username,
      movie: item.movie,
    }));
    return transformedReviews;
  }

  async create(data: CreateReviewDto) {
    try {
      const movie = await this.movieService.createIfNotExist(data.tmdbId);
      const user = await this.userService.createIfNotExist({
        username: data.userName,
      });

      const existingReview = await this.reviewsRepo.findOne({
        where: {
          movie: { id: movie.id },
          user: { id: user.id },
        },
      });

      const exception = await this.requestException(
        existingReview,
        data.rating,
      );

      if (exception) return exception;

      const newReview = this.reviewsRepo.create(data);
      newReview.movie = movie;
      newReview.user = user;

      return this.reviewsRepo.save(newReview);
    } catch (error) {
      throw error;
    }
  }

  private requestException(existingReview, rating: number) {
    if (existingReview) {
      return new BadRequestException(
        'A review with the same user and movie already exists',
      );
    }
    if (rating < 1) {
      return new BadRequestException('Rating must be at least 1');
    }
    if (rating > 10) {
      return new BadRequestException('Rating cannot exceed 10');
    }
    return;
  }
}
