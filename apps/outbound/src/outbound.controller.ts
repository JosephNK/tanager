import { Controller, Body, Get, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OutboundService } from './outbound.service';
import { RegisterInPortDto } from './models/register.in.port.dto';
import { RegisterOutPortDto } from './models/register.out.port.dto';
import { UnregisterInPortDto } from './models/unregister.in.port.dto';
import { UnregisterOutPortDto } from './models/unregister.out.port.dto';
import { SendMessageInPortDto } from './models/send.message.in.port.dto';
import { SendMessageOutPortDto } from './models/send.message.out.port.dto';

@Controller()
export class OutboundController {
  constructor(private readonly service: OutboundService) {}

  // RESTful

  @Post('register')
  register(@Body() dto: RegisterInPortDto): Promise<RegisterOutPortDto> {
    return this.service.register(dto, false);
  }

  @Post('unregister')
  unregister(@Body() dto: UnregisterInPortDto): Promise<UnregisterOutPortDto> {
    return this.service.unregister(dto, false);
  }

  @Post('sendMessage')
  sendMessage(dto: SendMessageInPortDto): Promise<SendMessageOutPortDto> {
    return this.service.sendMessage(dto, false);
  }

  // @Get('findTokenAll')
  // findTokenAll(
  //   @Query() dto: FindTokenInputPortDto,
  // ): Promise<FindTokenOutputPortDto[]> {
  //   return this.service.findTokenAll(dto, false);
  // }

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

  // @MessagePattern({ cmd: 'findTokenAll' })
  // findTokenAllStream(
  //   dto: SendMessageInputPortDto,
  // ): Promise<FindTokenOutputPortDto[]> {
  //   return this.service.findTokenAll(dto, true);
  // }
}
