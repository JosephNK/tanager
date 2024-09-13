import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  async getHello1(): Promise<string> {
    console.log('getHello1')
    const helloValue = await this.appService.getHello1();
    return lastValueFrom(helloValue);
  }
}
