import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { CreateReviewDto } from '../review/dtos';

@Injectable()
export class RatingValidationPipe implements PipeTransform {
  async transform(value: CreateReviewDto) {
    const ratingDto = plainToClass(CreateReviewDto, value);
    const errors = await validate(ratingDto);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((error) => Object.values(error.constraints)),
      );
    }

    return value;
  }
}
