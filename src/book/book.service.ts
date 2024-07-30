import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: ExpressQuery): Promise<Book[]> {
    const title = String(query?.title) || '';
    const description = String(query?.description) || '';
    const author = String(query?.author) || '';
    const category = String(query?.category) || '';
    const page = (+query?.page as number) || 1;
    const limit = +query?.limit as number;

    const titleRegex = new RegExp(title, 'i');
    const descriptionRegex = new RegExp(description, 'i');
    const authorRegex = new RegExp(author, 'i');
    const categoryRegex = new RegExp(category, 'i');

    let mongoFinalQuery = {};

    if (query?.title)
      mongoFinalQuery = {
        ...mongoFinalQuery,
        title: { $regex: titleRegex },
      };

    if (query?.description)
      mongoFinalQuery = {
        ...mongoFinalQuery,
        description: { $regex: descriptionRegex },
      };

    if (query?.author)
      mongoFinalQuery = {
        ...mongoFinalQuery,
        author: { $regex: authorRegex },
      };

    if (query?.category)
      mongoFinalQuery = {
        ...mongoFinalQuery,
        category: { $regex: categoryRegex },
      };

    const books = await this.bookModel
      .find(mongoFinalQuery)
      .skip((page - 1) * limit)
      .limit(limit);
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
