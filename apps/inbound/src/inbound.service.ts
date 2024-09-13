import { Injectable } from '@nestjs/common';

@Injectable()
export class InboundService {
  getHello(): string {
    return 'Hello World!';
  }

  getHello1(name: string): string {
    return `Hello ${name}!`;
  }
}
