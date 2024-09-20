import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { getPlatformEnum } from '@app/commons';
import {
  RegisterInputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
} from '@app/commons';

/// Service
@Injectable()
export class InboundService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 3100,
      },
    });
  }

  register(dto: RegisterInputPortDto): string {
    const token = dto.token;
    const platform = getPlatformEnum(dto.platform);
    return `Hello World! ${token}, ${platform}`;
  }

  unregister(dto: UnregisterInputPortDto): string {
    return `Hello World! ${dto.token}`;
  }

  findTokenAll(dto: FindTokenInputPortDto): string {
    return `Hello World! ${dto.identifier}`;
  }

  getHello1(name: string): string {
    return `Hello ${name}!`;
  }
}
