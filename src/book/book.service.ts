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

  async create(book: Book): Promise<Book> {
    const books = await this.bookModel.create(book);
    return books;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(new mongoose.Types.ObjectId(id));
    return book;
  }
}
