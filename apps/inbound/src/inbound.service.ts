import {
  MessageStatus,
  Platform,
  Provider,
  RegisterInputPortDto,
  RegisterOutputPortDto,
  TokenStatus,
} from '@app/commons';
import {
  MessageNotFoundException,
  ProviderNotFoundException,
  ReceiverNotFoundException,
  TokenNotFoundException,
  toException,
} from '@app/exceptions';
import { Injectable } from '@nestjs/common';
import { SendMessageInPortDto } from './models/message.in.port.dto';
import { SendMessageOutPortDto } from './models/message.out.port.dto';
import { RegisterOutPortDto } from './models/register.out.port.dto';
import { TokenInPortDto } from './models/token.in.port.dto';
import { TokenOutPortDto } from './models/token.out.port.dto';
import { UnregisterInPortDto } from './models/unregister.in.port.dto';
import { UnregisterOutPortDto } from './models/unregister.out.port.dto';

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
      const platform = dto.platform;

      if (identifier.length == 0) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }

      const outDto = new RegisterOutputPortDto();
      outDto.identifier = identifier;
      outDto.token = token;
      outDto.platform = platform;

      return outDto;
    } catch (error) {
      throw error;
    }
  }

  async unregister(
    dto: UnregisterInPortDto,
    isRPC: boolean,
  ): Promise<UnregisterOutPortDto> {
    try {
      const receiver = dto.receiver;
      const provider = dto.provider;
      const optional = dto.optional;

      if (receiver.length == 0) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }

      if (provider === Provider.NONE) {
        throw toException(new ProviderNotFoundException(), isRPC);
      }

      if (provider === Provider.FIREBASE) {
        if (!optional || !optional.token) {
          throw toException(new TokenNotFoundException(), isRPC);
        }
      }

      const outDto = new UnregisterOutPortDto();
      outDto.receiver = receiver;
      outDto.provider = provider;
      outDto.optional = optional;

      return outDto;
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(
    dto: SendMessageInPortDto,
    isRPC: boolean,
  ): Promise<SendMessageOutPortDto> {
    try {
      const receiver = dto.receiver;
      const provider = dto.provider;
      const optional = dto.optional;

      if (receiver.length == 0) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }

      if (provider === Provider.NONE) {
        throw toException(new ProviderNotFoundException(), isRPC);
      }

      if (provider === Provider.FIREBASE) {
        if (!optional || !optional.message) {
          throw toException(new MessageNotFoundException(), isRPC);
        }
      }

      const outDto = new SendMessageOutPortDto();
      outDto.receiver = receiver;
      outDto.provider = provider;
      outDto.optional = optional;
      outDto.messageStatus = MessageStatus.PENDING;

      return outDto;
    } catch (error) {
      throw error;
    }
  }

  async findTokenAll(
    dto: TokenInPortDto,
    isRPC: boolean,
  ): Promise<TokenOutPortDto> {
    try {
      const receiver = dto.receiver;

      if (receiver.length == 0) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }

      const outDto = new TokenOutPortDto();
      outDto.receiver = receiver;
      outDto.optional = null;
      outDto.platform = Platform.NONE;
      outDto.tokenStatus = TokenStatus.PENDING;

      return outDto;
    } catch (error) {
      throw error;
    }
  }
}
