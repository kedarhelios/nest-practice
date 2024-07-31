import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll() {
    const foundUsers = await this.userModel.find();

    if (!foundUsers) throw new NotFoundException('No user found');

    return foundUsers;
  }

  async findOne(id: number) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('Id is invalid');

    const foundUser = await this.userModel.findById(
      new mongoose.Types.ObjectId(id),
    );

    if (!foundUser) throw new NotFoundException('User not found');

    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('Id is invalid');

    const foundUser = await this.userModel.findById(
      new mongoose.Types.ObjectId(id),
    );

    if (!foundUser) throw new NotFoundException('User not found');

    const updatedUser = await this.userModel.updateOne(
      new mongoose.Types.ObjectId(id),
      updateUserDto,
    );

    if (updatedUser.acknowledged && updatedUser.matchedCount == 0)
      throw new NotFoundException('User not found');
    else if (updatedUser.acknowledged && updatedUser.modifiedCount == 0)
      throw new NotFoundException('Nothing to modify in user');

    return { ...foundUser, ...updateUserDto };
  }

  async remove(id: number) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('Id is invalid');

    const foundUser = await this.userModel.deleteOne(
      new mongoose.Types.ObjectId(id),
    );

    if (foundUser.acknowledged && foundUser.deletedCount == 0)
      throw new NotFoundException('User not found');

    return { msg: 'User deleted successfully' };
  }
}
