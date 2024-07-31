import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum CATEGORY {
  ADVENTURE = 'adventure',
  CLASSICS = 'classics',
  CRIME = 'crime',
  FANTASY = 'fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: CATEGORY;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
