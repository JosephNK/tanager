import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import {
  ContentTypeApplicationJsonGuard,
  FindTokenInputPortDto,
  FindTokenOutputPortDto,
  RegisterInputPortDto,
  RegisterOutputPortDto,
  SendMessageInputPortDto,
  SendMessageOutputPortDto,
  SendPort,
  TokenPort,
  UnregisterInputPortDto,
  UnregisterOutputPortDto,
} from '@app/commons';
import { AppService } from './app.service';

@Controller()
export class AppController implements TokenPort, SendPort {
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
    @Query() dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto> {
    return this.appService.findTokenAll(dto);
  }

  @Post('sendMessage')
  sendMessage(
    @Body() dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto> {
    return this.appService.sendMessage(dto);
  }
}
