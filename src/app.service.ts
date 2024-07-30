import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello!';
  }
  getHelloWorld(): string {
    return 'Hello World!';
  }
}
