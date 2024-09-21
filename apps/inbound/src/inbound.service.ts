import { Injectable } from '@nestjs/common';
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
  toException,
} from '@app/exceptions';

/// Service
@Injectable()
export class InboundService {
  async register(
    dto: RegisterInputPortDto,
    isRPC: boolean,
  ): Promise<RegisterOutputPortDto> {
    try {
      const identifier = dto.identifier;
      const token = dto.token;
      const platform = getPlatformEnum(dto.platform);
      if (!identifier) {
        throw toException(new IdentifierNotFoundException(), isRPC);
      }
      if (!token) {
        throw toException(new TokenNotFoundException(), isRPC);
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
}
