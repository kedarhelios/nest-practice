import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks() {
    return await this.bookService.findAll();
  }

  @Post()
  createBook() {}
}
