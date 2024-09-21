import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InboundService } from './inbound.service';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
  TokenPort,
  UnregisterOutputPortDto,
  SendMessageInputPortDto,
  SendPort,
  SendMessageOutputPortDto,
  FindTokenOutputPortDto,
} from '@app/commons';

/// Adapter
@Controller()
export class InboundController implements TokenPort, SendPort {
  constructor(private readonly service: InboundService) {}

  // RESTful

  @Post('register')
  register(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.service.register(dto, false);
  }

  @Post('unregister')
  unregister(
    @Body() dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto> {
    return this.service.unregister(dto, false);
  }

  @Get('findTokenAll')
  findTokenAll(
    @Query() dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto> {
    return this.service.findTokenAll(dto, false);
  }

  @Post('sendMessage')
  async sendMessage(
    @Body() dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto> {
    return this.service.sendMessage(dto, false);
  }

  // MessagePattern

  @MessagePattern({ cmd: 'register' })
  registerStream(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.service.register(dto, true);
  }

  @MessagePattern({ cmd: 'unregister' })
  unregisterStream(
    dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto> {
    return this.service.unregister(dto, true);
  }

  @MessagePattern({ cmd: 'findTokenAll' })
  findTokenAllStream(
    dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto> {
    return this.service.findTokenAll(dto, true);
  }

  @MessagePattern({ cmd: 'sendMessage' })
  sendMessageStream(
    dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto> {
    return this.service.sendMessage(dto, true);
  }
}
