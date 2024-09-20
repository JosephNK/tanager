import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { OutboundService } from './outbound.service';
import {
  OutboundRegisterInputPortDto,
  OutboundUnregisterInputPortDto,
  OutboundSendMessageInputPortDto,
  OutboundFindTokenInputPortDto,
} from './outbound.input.port';

@Controller()
export class OutboundController {
  constructor(private readonly service: OutboundService) {}

  // RESTful

  @Post('register')
  register(@Body() dto: OutboundRegisterInputPortDto): string {
    return this.service.register(dto);
  }

  @Post('unregister')
  unregister(@Body() dto: OutboundUnregisterInputPortDto): string {
    return this.service.unregister(dto);
  }

  @Get('findTokenAll')
  findTokenAll(@Query() dto: OutboundSendMessageInputPortDto): string {
    return this.service.findTokenAll(dto);
  }

  // MessagePattern

  @MessagePattern('register')
  registerStream(dto: OutboundRegisterInputPortDto): string {
    return this.service.register(dto);
  }

  @MessagePattern('unregister')
  unregisterStream(@Body() dto: OutboundUnregisterInputPortDto): string {
    return this.service.unregister(dto);
  }

  @MessagePattern('findTokenAll')
  findTokenAllStream(@Query() dto: OutboundSendMessageInputPortDto): string {
    return this.service.findTokenAll(dto);
  }
}
