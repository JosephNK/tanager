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
} from '@app/commons';

@Controller()
export class OutboundController implements TokenPort {
  constructor(private readonly service: OutboundService) {}

  // RESTful

  @Post('register')
  resigter(@Body() dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    return this.service.register(dto, false);
  }

  @Post('unresigter')
  unresigter(dto: UnregisterInputPortDto): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }

  @Get('findTokenAll')
  findTokenAll(
    @Query() dto: SendMessageInputPortDto,
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
    @Query() dto: SendMessageInputPortDto,
  ): Promise<RegisterEmptyOutputPortDto> {
    console.log('dto', dto);
    throw new Error('Method not implemented.');
  }
}
