import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, CATEGORY } from './schemas/book.schema';
import mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook({
    title,
    description,
    author,
    price,
    category,
  }: {
    title: string;
    description: string;
    author: string;
    price: string;
    category: CATEGORY;
  }): Promise<Book[]> {
    const books = await this.bookModel.create(
      title,
      description,
      author,
      price,
      category,
    );
    return books;
  }
}
