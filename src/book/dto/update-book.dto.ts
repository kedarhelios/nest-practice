import { User } from 'src/auth/schemas/user.schema';
import { CATEGORY } from '../schemas/book.schema';
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(CATEGORY, { message: 'Please enter correct category.' })
  readonly category: CATEGORY;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
