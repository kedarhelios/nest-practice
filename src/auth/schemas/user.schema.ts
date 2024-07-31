import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email is already registered!'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
