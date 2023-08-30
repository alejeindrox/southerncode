import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

import { UserService } from '../services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of reviews' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userName/reviews')
  @ApiOperation({ summary: 'Get reviews from user' })
  @ApiParam({
    name: 'userName',
    required: true,
    example: 'John Doe',
    description: 'Name of user (allow special characters in encodeURI)',
    schema: { oneOf: [{ type: 'string' }] },
  })
  findOneWithReviews(@Param('userName') username: string) {
    return this.usersService.findOne(username);
  }
}
