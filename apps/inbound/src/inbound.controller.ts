import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InboundService } from './inbound.service';
import {
  RegisterInputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
} from '@app/commons';

/// Adapter
@Controller()
export class InboundController {
  constructor(private readonly service: InboundService) {}

  // RESTful

  @Post('register')
  register(@Body() dto: RegisterInputPortDto): string {
    console.log('register');
    return this.service.register(dto);
  }

  @Post('unregister')
  unregister(@Body() dto: UnregisterInputPortDto): string {
    return this.service.unregister(dto);
  }

  @Get('findTokenAll')
  findTokenAll(@Query() dto: FindTokenInputPortDto): string {
    return this.service.findTokenAll(dto);
  }

  // MessagePattern

  @MessagePattern({ cmd: 'register' })
  registerStream(dto: RegisterInputPortDto): string {
    return this.service.register(dto);
  }

  @MessagePattern({ cmd: 'unregister' })
  unregisterStream(@Body() dto: UnregisterInputPortDto): string {
    return this.service.unregister(dto);
  }

  @MessagePattern({ cmd: 'findTokenAll' })
  findTokenAllStream(@Query() dto: FindTokenInputPortDto): string {
    return this.service.findTokenAll(dto);
  }
}
