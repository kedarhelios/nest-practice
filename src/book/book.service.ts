import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
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
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      book,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id: string) {
    return await this.bookModel.deleteOne(new mongoose.Types.ObjectId(id));
  }
}
