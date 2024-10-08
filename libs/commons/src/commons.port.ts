import {
  FirebaseMessageStatus,
  MessageStatus,
  Platform,
  TokenStatus,
} from '@app/commons';
import { ApiProperty } from '@nestjs/swagger';

/// Input Port

export class RegisterInputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token: string;

  @ApiProperty({
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;
}

export class UnregisterInputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token?: string;
}

export class SendMessageInputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: object;
}

export class FindTokenInputPortDto {
  @ApiProperty()
  identifier: string;
}

export class FirebaseSendMessageInputPortDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: object;
}

/// Output Port

export class RegisterOutputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token: string;

  @ApiProperty({
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;

  @ApiProperty({
    enum: [...Object.keys(TokenStatus)],
    enumName: 'TokenStatus',
  })
  status?: TokenStatus;
}

export class UnregisterOutputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token: string;

  @ApiProperty({
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;

  @ApiProperty({
    enum: [...Object.keys(TokenStatus)],
    enumName: 'TokenStatus',
  })
  status?: TokenStatus;
}

export class FindTokenOutputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token: string;

  @ApiProperty({
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;

  @ApiProperty({
    enum: [...Object.keys(TokenStatus)],
    enumName: 'TokenStatus',
  })
  status?: TokenStatus;
}

export class SendMessageOutputPortDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  token: string;

  @ApiProperty({
    enum: [...Object.keys(MessageStatus)],
    enumName: 'MessageStatus',
  })
  messageStatus?: MessageStatus;
}

export class FirebaseSendMessageOutputPortDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  errorCode?: string;

  @ApiProperty({
    enum: [...Object.keys(FirebaseMessageStatus)],
    enumName: 'FirebaseMessageStatus',
  })
  status: FirebaseMessageStatus;
}

/// Interface

export interface TokenPort {
  register(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto>;

  unregister(dto: UnregisterInputPortDto): Promise<UnregisterOutputPortDto[]>;

  findTokenAll(dto: FindTokenInputPortDto): Promise<FindTokenOutputPortDto[]>;
}

export interface SendPort {
  sendMessage(
    dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto[]>;
}

/// Utils
/// Data Object to String
export function getMessageDataFrom(dto: SendMessageInputPortDto): string {
  const title = dto.title;
  const message = dto.message;
  const data = dto.data;

  let messageData: string;
  try {
    const defaultData = {
      title: title,
      message: message,
    };
    if (typeof data === 'string') {
      messageData = JSON.stringify({
        ...defaultData,
        data: JSON.parse(data),
      });
    } else {
      messageData = JSON.stringify({
        ...defaultData,
      });
    }
  } catch (error) {
    throw error;
  }

  return messageData;
}
