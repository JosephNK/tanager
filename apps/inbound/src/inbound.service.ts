import { Injectable } from '@nestjs/common';
import {
  FindTokenOutputPortDto,
  getPlatformEnum,
  MessageStatus,
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
  IdentifierNotFoundException,
  MessageNotFoundException,
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

      const outputDto = new RegisterOutputPortDto();
      outputDto.identifier = identifier;
      outputDto.token = token;
      outputDto.platform = platform;

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
        throw toException(new IdentifierNotFoundException(), isRPC);
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
        throw toException(new IdentifierNotFoundException(), isRPC);
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
        throw toException(new IdentifierNotFoundException(), isRPC);
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
