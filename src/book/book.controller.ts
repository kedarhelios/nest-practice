import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(
    @Query()
    query: ExpressQuery,
  ): Promise<Book[]> {
    return await this.bookService.findAll(query);
  }

  @Get(':id')
  async getBook(
    @Param()
    id: number,
  ): Promise<Book> {
    return await this.bookService.findById(id);
  }

  @Post()
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return await this.bookService.create(book);
  }

  @Patch(':id')
  async updateBookById(
    @Param()
    id: string,

    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBookById(
    @Param()
    id: string,
  ) {
    return await this.bookService.deleteById(id);
  }
}
