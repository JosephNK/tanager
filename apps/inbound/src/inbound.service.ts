import { Injectable } from '@nestjs/common';
import { getPlatformEnum, UnregisterOutputPortDto } from '@app/commons';
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

  async unregister(
    dto: UnregisterInputPortDto,
    isRPC: boolean,
  ): Promise<UnregisterOutputPortDto> {
    try {
      const identifier = dto.identifier;
      const token = dto.token;
      if (!identifier) {
        throw toException(new IdentifierNotFoundException(), isRPC);
      }
      return [
        {
          identifier: identifier,
          token: token,
        },
      ] as UnregisterOutputPortDto;
    } catch (error) {
      throw error;
    }
  }

  findTokenAll(dto: FindTokenInputPortDto): string {
    return `Hello World! ${dto.identifier}`;
  }
}
