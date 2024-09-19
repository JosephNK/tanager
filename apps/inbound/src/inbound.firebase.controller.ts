import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { InboundFirebaseService } from './inbound.firebase.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  InboundRegisterInputPortDto,
  InboundUnregisterInputPortDto,
  InboundSendMessageInputPortDto,
  InboundFindTokenInputPortDto,
} from './inbound.input.port';

/// Adapter
@Controller()
export class InboundFirebaseController {
  constructor(private readonly service: InboundFirebaseService) {}

  // RESTful

  @Post('sendMessage')
  async sendMessage(
    @Body() dto: InboundSendMessageInputPortDto,
  ): Promise<string> {
    return this.service.sendMessage(dto);
  }

  // MessagePattern

  @MessagePattern('sendMessage')
  async sendMessageStream(
    @Body() dto: InboundSendMessageInputPortDto,
  ): Promise<string> {
    return this.service.sendMessage(dto);
  }
}
