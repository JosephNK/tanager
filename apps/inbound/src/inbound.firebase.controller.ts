import { Controller, Body, Post } from '@nestjs/common';
import { InboundFirebaseService } from './inbound.firebase.service';
import { MessagePattern } from '@nestjs/microservices';
import { SendMessageInputPortDto } from '@app/commons';

/// Adapter
@Controller()
export class InboundFirebaseController {
  constructor(private readonly service: InboundFirebaseService) {}

  // RESTful

  @Post('sendMessage')
  async sendMessage(@Body() dto: SendMessageInputPortDto): Promise<string> {
    return this.service.sendMessage(dto);
  }

  // MessagePattern

  @MessagePattern('sendMessage')
  async sendMessageStream(
    @Body() dto: SendMessageInputPortDto,
  ): Promise<string> {
    return this.service.sendMessage(dto);
  }
}
