import { Injectable } from '@nestjs/common';
import {
  FindTokenOutputPortDto,
  getPlatformEnum,
  MessageStatus,
  Provider,
  SendMessageInputPortDto,
  SendMessageOutputPortDto,
  UnregisterOutputPortDto,
} from '@app/commons';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
} from '@app/commons';
import {
  MessageNotFoundException,
  ProviderNotFoundException,
  ReceiverNotFoundException,
  TokenNotFoundException,
  toException,
} from '@app/exceptions';
import { InboundRegisterInputPortDto } from './dtos/input.port.dto';
import { InboundRegisterOutputPortDto } from './dtos/output.port.dto';

/// Service
@Injectable()
export class InboundService {
  async register(
    dto: InboundRegisterInputPortDto,
    isRPC: boolean,
  ): Promise<InboundRegisterOutputPortDto> {
    console.log('InboundService register', dto);
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

      const outputDto = new InboundRegisterOutputPortDto();
      outputDto.inputPortDto = dto;

      return outputDto;
    } catch (error) {
      throw error;
    }
  }

  async unregister(
    dto: UnregisterInputPortDto,
    isRPC: boolean,
  ): Promise<UnregisterOutputPortDto[]> {
    try {
      const identifier = dto.identifier;
      const token = dto.token;

      if (!identifier) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }

      const outputDto = new UnregisterOutputPortDto();
      outputDto.identifier = identifier;
      outputDto.token = token;

      return [outputDto];
    } catch (error) {
      throw error;
    }
  }

  async findTokenAll(
    dto: FindTokenInputPortDto,
    isRPC: boolean,
  ): Promise<FindTokenOutputPortDto[]> {
    try {
      const identifier = dto.identifier;

      if (!identifier) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }

      const outputDto = new FindTokenOutputPortDto();
      outputDto.identifier = identifier;
      outputDto.token = '';

      return [outputDto];
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(
    dto: SendMessageInputPortDto,
    isRPC: boolean,
  ): Promise<SendMessageOutputPortDto[]> {
    try {
      const identifier = dto.identifier;
      const token = dto.token;
      const message = dto.message;

      if (!identifier) {
        throw toException(new ReceiverNotFoundException(), isRPC);
      }
      if (!message) {
        throw toException(new MessageNotFoundException(), isRPC);
      }

      const outputDto = new SendMessageOutputPortDto();
      outputDto.identifier = identifier;
      outputDto.token = token;
      outputDto.messageStatus = MessageStatus.PENDING;

      return [outputDto];
    } catch (error) {
      throw error;
    }
  }
}
