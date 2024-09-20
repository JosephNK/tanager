import { Controller, Post, Body } from '@nestjs/common';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
  // UnregisterInputPortDto,
  // SendMessageInputPortDto,
  // FindTokenInputPortDto,
} from '@app/commons';
import { AppService } from './app.service';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async resigter(): Promise<string> {
  //   console.log('getHello1');
  //   const helloValue = await this.appService.resigter();
  //   return lastValueFrom(helloValue);
  // }

  // RESTful

  @Post('register')
  register(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.appService.register(dto);
  }
}
