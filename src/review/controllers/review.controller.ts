import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dtos/index';
import { ReviewsExceptionFilter } from '../../utils/reviews-exception.filter';
import { RatingValidationPipe } from '../../utils/rating-validation.pipe';

@ApiTags('reviews')
@Controller('reviews')
@UseFilters(ReviewsExceptionFilter)
export class ReviewController {
  constructor(private reviewsService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of reviews' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a review for movie' })
  @UsePipes(new RatingValidationPipe())
  create(@Body() payload: CreateReviewDto) {
    return this.reviewsService.create(payload);
  }
}
