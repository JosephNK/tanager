import { Controller, Get } from '@nestjs/common';
import { InboundService } from './inbound.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InboundController {
  constructor(private readonly inboundService: InboundService) { }

  @Get()
  getHello(): string {
    return this.inboundService.getHello();
  }

  @MessagePattern('getHello1')
  getHello1(name: string): string {
    console.log('MessagePattern getHello1')
    return this.inboundService.getHello1(name);
  }
}
