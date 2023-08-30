import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ReviewsExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === '23505') {
      const message = 'Duplicate key value violates unique constraint.';
      response.status(HttpStatus.BAD_REQUEST).json({ message });
    } else {
      const message = 'Invalid value.';
      response.status(HttpStatus.BAD_REQUEST).json({ message });
    }
  }
}
