import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ContentTypeApplicationJsonGuard,
  FindTokenInputPortDto,
  RegisterEmptyOutputPortDto,
  RegisterInputPortDto,
  RegisterOutputPortDto,
  TokenPort,
  UnregisterInputPortDto,
} from '@app/commons';
import { AppService } from './app.service';

@Controller()
export class AppController implements TokenPort {
  constructor(private readonly appService: AppService) {}

  // RESTful

  @Post('register')
  @UseGuards(ContentTypeApplicationJsonGuard)
  resigter(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.appService.register(dto);
  }

  unresigter(dto: UnregisterInputPortDto): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  findTokenAll(
    dto: FindTokenInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }
}
