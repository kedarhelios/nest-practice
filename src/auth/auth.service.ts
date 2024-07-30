import { Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const foundUser = await this.userModel.findOne({ email });

    if (!foundUser)
      throw new UnauthorizedException('Invalid email or password');

    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid email or password');

    const token = this.jwtService.sign({ id: foundUser._id });

    return {
      token,
    };
  }
}
