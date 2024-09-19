import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { InboundService } from './inbound.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  InboundRegisterInputPortDto,
  InboundUnregisterInputPortDto,
  InboundSendMessageInputPortDto,
  InboundFindTokenInputPortDto,
} from './inbound.input.port';

/// Adapter
@Controller()
export class InboundController {
  constructor(private readonly service: InboundService) {}

  // RESTful

  @Post('register')
  register(@Body() dto: InboundRegisterInputPortDto): string {
    return this.service.register(dto);
  }

  @Post('unregister')
  unregister(@Body() dto: InboundUnregisterInputPortDto): string {
    return this.service.unregister(dto);
  }

  @Get('findTokenAll')
  findTokenAll(@Query() dto: InboundSendMessageInputPortDto): string {
    return this.service.findTokenAll(dto);
  }

  // MessagePattern

  @MessagePattern('register')
  registerStream(dto: InboundRegisterInputPortDto): string {
    return this.service.register(dto);
  }

  @MessagePattern('unregister')
  unregisterStream(@Body() dto: InboundUnregisterInputPortDto): string {
    return this.service.unregister(dto);
  }

  @MessagePattern('findTokenAll')
  findTokenAllStream(@Query() dto: InboundSendMessageInputPortDto): string {
    return this.service.findTokenAll(dto);
  }

  @MessagePattern('getHello1')
  getHello1(name: string): string {
    console.log('MessagePattern getHello1');
    return this.service.getHello1(name);
  }
}
