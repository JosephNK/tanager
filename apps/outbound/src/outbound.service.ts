import { Injectable } from '@nestjs/common';
import {
  OutboundRegisterInputPortDto,
  OutboundUnregisterInputPortDto,
  OutboundFindTokenInputPortDto,
} from './outbound.input.port';

@Injectable()
export class OutboundService {
  register(dto: OutboundRegisterInputPortDto): string {
    return `Hello World! ${dto.token}`;
  }

  unregister(dto: OutboundUnregisterInputPortDto): string {
    return `Hello World! ${dto.token}`;
  }

  findTokenAll(dto: OutboundFindTokenInputPortDto): string {
    return `Hello World! ${dto.id}`;
  }
}
