import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ContentTypeApplicationJsonGuard,
  FindTokenInputPortDto,
  RegisterEmptyOutputPortDto,
  RegisterInputPortDto,
  RegisterOutputPortDto,
  TokenPort,
  UnregisterInputPortDto,
  UnregisterOutputPortDto,
} from '@app/commons';
import { AppService } from './app.service';

@Controller()
export class AppController implements TokenPort {
  constructor(private readonly appService: AppService) {}

  // RESTful

  @Post('register')
  @UseGuards(ContentTypeApplicationJsonGuard)
  register(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.appService.register(dto);
  }

  @Post('unregister')
  unregister(
    @Body() dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto> {
    return this.appService.unregister(dto);
  }

  @Get('findTokenAll')
  findTokenAll(
    dto: FindTokenInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }
}
