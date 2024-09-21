import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OutboundService } from './outbound.service';
import {
  RegisterInputPortDto,
  UnregisterInputPortDto,
  SendMessageInputPortDto,
  TokenPort,
  RegisterOutputPortDto,
  RegisterEmptyOutputPortDto,
  UnregisterOutputPortDto,
  SendPort,
  SendMessageOutputPortDto,
  FindTokenInputPortDto,
} from '@app/commons';

@Controller()
export class OutboundController implements TokenPort, SendPort {
  constructor(private readonly service: OutboundService) {}

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
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  @Post('sendMessage')
  sendMessage(dto: SendMessageInputPortDto): Promise<SendMessageOutputPortDto> {
    return this.service.sendMessage(dto, false);
  }

  // MessagePattern

  @MessagePattern({ cmd: 'register' })
  registerStream(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.service.register(dto, true);
  }

  @MessagePattern({ cmd: 'unregister' })
  unregisterStream(
    @Body() dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto> {
    return this.service.unregister(dto, true);
  }

  @MessagePattern({ cmd: 'findTokenAll' })
  findTokenAllStream(
    @Query() dto: SendMessageInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  @MessagePattern({ cmd: 'sendMessage' })
  sendMessageStream(
    dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto> {
    return this.service.sendMessage(dto, true);
  }
}
