import { Injectable } from '@nestjs/common';
import {
  InboundRegisterInputPortDto,
  InboundUnregisterInputPortDto,
  InboundSendMessageInputPortDto,
  InboundFindTokenInputPortDto,
} from './inbound.input.port';

/// Service
@Injectable()
export class InboundService {
  register(dto: InboundRegisterInputPortDto): string {
    return `Hello World! ${dto.token}`;
  }

  unregister(dto: InboundUnregisterInputPortDto): string {
    return `Hello World! ${dto.token}`;
  }

  findTokenAll(dto: InboundFindTokenInputPortDto): string {
    return `Hello World! ${dto.id}`;
  }

  getHello1(name: string): string {
    return `Hello ${name}!`;
  }
}
