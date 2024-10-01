import { Injectable } from '@nestjs/common';
import {
  MessageNotFoundException,
  ProviderNotFoundException,
  ReceiverNotFoundException,
  TokenNotFoundException,
  toException,
} from '@app/exceptions';
import {
  MessageStatus,
  Provider,
  RegisterInPortDto,
  RegisterOutPortDto,
  SendMessageInPortDto,
  SendMessageOutPortDto,
  TokenInPortDto,
  TokenOutPortDto,
  TokenStatus,
  UnregisterInPortDto,
  UnregisterOutPortDto,
} from '@app/models';

/// Service
@Injectable()
export class InboundService {
  async register(
    dto: RegisterInPortDto,
    isRPC: boolean,
  ): Promise<RegisterOutPortDto> {
    console.log('InboundService register', dto);
    try {
      const receiver = dto.receiver;
      const sender = dto.sender;
      const provider = dto.provider;
      const optional = dto.optional;
      const platform = dto.platform;

      if (receiver.length == 0) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }
      if (!provider || provider === Provider.NONE) {
        throw toException(new ProviderNotFoundException(), isRPC);
      }

      if (provider === Provider.FIREBASE) {
        if (!optional || !optional.token) {
          throw toException(new TokenNotFoundException(), isRPC);
        }
      }

      const outDto = new RegisterOutPortDto();
      outDto.receiver = receiver;
      outDto.sender = sender;
      outDto.provider = provider;
      outDto.optional = optional;
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
      outDto.platform = null;
      outDto.status = TokenStatus.PENDING;

      return outDto;
    } catch (error) {
      throw error;
    }
  }
}
