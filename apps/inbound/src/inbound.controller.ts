import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InboundService } from './inbound.service';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
  TokenPort,
  RegisterEmptyOutputPortDto,
} from '@app/commons';

/// Adapter
@Controller()
export class InboundController implements TokenPort {
  constructor(private readonly service: InboundService) {}

  // RESTful

  @Post('register')
  resigter(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.service.register(dto, false);
  }

  @Post('unregister')
  unresigter(dto: UnregisterInputPortDto): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  @Get('findTokenAll')
  findTokenAll(
    dto: FindTokenInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  // MessagePattern

  @MessagePattern({ cmd: 'register' })
  registerStream(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.service.register(dto, true);
  }

  @MessagePattern({ cmd: 'unregister' })
  unregisterStream(
    @Body() dto: UnregisterInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  @MessagePattern({ cmd: 'findTokenAll' })
  findTokenAllStream(
    @Query() dto: FindTokenInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }
}
