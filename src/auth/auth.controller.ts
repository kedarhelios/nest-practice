import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { SignInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ user: { name: string; email: string }; token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  async signIn(
    @Body()
    signInDto: SignInDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }
}
