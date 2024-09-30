import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InboundService } from './inbound.service';
import {
  UnregisterInputPortDto,
  FindTokenInputPortDto,
  TokenPort,
  UnregisterOutputPortDto,
  SendMessageInputPortDto,
  SendPort,
  SendMessageOutputPortDto,
  FindTokenOutputPortDto,
} from '@app/commons';
import { InboundRegisterInputPortDto } from './dtos/input.port.dto';
import { InboundRegisterOutputPortDto } from './dtos/output.port.dto';

/// Adapter
@Controller()
export class InboundController {
  constructor(private readonly service: InboundService) {}

  // RESTful

  @Post('register')
  register(
    @Body() dto: InboundRegisterInputPortDto,
  ): Promise<InboundRegisterOutputPortDto> {
    return this.service.register(dto, false);
  }

  @Post('unregister')
  unregister(
    @Body() dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto[]> {
    return this.service.unregister(dto, false);
  }

  @Get('findTokenAll')
  findTokenAll(
    @Query() dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto[]> {
    return this.service.findTokenAll(dto, false);
  }

  @Post('sendMessage')
  async sendMessage(
    @Body() dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto[]> {
    return this.service.sendMessage(dto, false);
  }

  // MessagePattern

  @MessagePattern({ cmd: 'register' })
  registerStream(
    dto: InboundRegisterInputPortDto,
  ): Promise<InboundRegisterOutputPortDto> {
    return this.service.register(dto, true);
  }

  @MessagePattern({ cmd: 'unregister' })
  unregisterStream(
    dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto[]> {
    return this.service.unregister(dto, true);
  }

  @MessagePattern({ cmd: 'findTokenAll' })
  findTokenAllStream(
    dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto[]> {
    return this.service.findTokenAll(dto, true);
  }

  @MessagePattern({ cmd: 'sendMessage' })
  sendMessageStream(
    dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto[]> {
    return this.service.sendMessage(dto, true);
  }
}
