import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email id!' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;
}
