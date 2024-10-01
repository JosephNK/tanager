import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InboundService } from './inbound.service';
import {
  RegisterInPortDto,
  RegisterOutPortDto,
  SendMessageInPortDto,
  SendMessageOutPortDto,
  TokenInPortDto,
  TokenOutPortDto,
  UnregisterInPortDto,
  UnregisterOutPortDto,
} from '@app/models';

/// Adapter
@Controller()
export class InboundController {
  constructor(private readonly service: InboundService) {}

  // RESTful

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('register')
  register(@Body() dto: RegisterInPortDto): Promise<RegisterOutPortDto> {
    return this.service.register(dto, false);
  }

  @Post('unregister')
  unregister(@Body() dto: UnregisterInPortDto): Promise<UnregisterOutPortDto> {
    return this.service.unregister(dto, false);
  }

  @Post('sendMessage')
  async sendMessage(
    @Body() dto: SendMessageInPortDto,
  ): Promise<SendMessageOutPortDto> {
    return this.service.sendMessage(dto, false);
  }

  @Get('findTokenAll')
  findTokenAll(@Query() dto: TokenInPortDto): Promise<TokenOutPortDto> {
    return this.service.findTokenAll(dto, false);
  }

  // MessagePattern

  @MessagePattern({ cmd: 'register' })
  registerStream(dto: RegisterInPortDto): Promise<RegisterOutPortDto> {
    return this.service.register(dto, true);
  }

  @MessagePattern({ cmd: 'unregister' })
  unregisterStream(dto: UnregisterInPortDto): Promise<UnregisterOutPortDto> {
    return this.service.unregister(dto, true);
  }

  @MessagePattern({ cmd: 'sendMessage' })
  sendMessageStream(dto: SendMessageInPortDto): Promise<SendMessageOutPortDto> {
    return this.service.sendMessage(dto, true);
  }

  @MessagePattern({ cmd: 'findTokenAll' })
  findTokenAllStream(dto: TokenInPortDto): Promise<TokenOutPortDto> {
    return this.service.findTokenAll(dto, true);
  }
}
