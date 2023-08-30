import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  @ApiProperty({ description: "user's name" })
  readonly username: string;
}
