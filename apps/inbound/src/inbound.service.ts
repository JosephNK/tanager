import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { getPlatformEnum } from '@app/commons';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
} from '@app/commons';
import {
  IdentifierNotFoundException,
  TokenNotFoundException,
} from '@app/exceptions';

/// Service
@Injectable()
export class InboundService {
  register(dto: RegisterInputPortDto, isRPC: boolean): RegisterOutputPortDto {
    try {
      const identifier = dto.identifier;
      const token = dto.token;
      const platform = getPlatformEnum(dto.platform);
      if (identifier === undefined || identifier === '') {
        if (isRPC) {
          throw new RpcException(new IdentifierNotFoundException());
        } else {
          throw new IdentifierNotFoundException();
        }
      }
      if (token === undefined || token === '') {
        if (isRPC) {
          throw new RpcException(new TokenNotFoundException());
        } else {
          throw new TokenNotFoundException();
        }
      }
      return {
        identifier: identifier,
        token: token,
        platform: platform,
      };
    } catch (error) {
      throw error;
    }
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
