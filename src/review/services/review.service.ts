import { Injectable } from '@nestjs/common';
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
    const reviews = await this.reviewsRepo.find({ relations: ['user'] });
    const transformedReviews = reviews.map((item) => ({
      rating: item.rating,
      username: item.user.username,
    }));
    return transformedReviews;
  }

  async create(data: CreateReviewDto) {
    try {
      const movie = await this.movieService.createIfNotExist(data.tmdbId);
      const user = await this.userService.createIfNotExist({
        username: data.userName,
      });

      const newReview = this.reviewsRepo.create(data);
      newReview.movie = movie;
      newReview.user = user;

      return this.reviewsRepo.save(newReview);
    } catch (error) {
      throw error;
    }
  }
}
