import {
  FirebaseMessageStatus,
  MessageStatus,
  Platform,
  TokenStatus,
} from '@app/commons';

/// Input Port

export type RegisterInputPortDto = {
  identifier: string;
  token: string;
  platform?: Platform;
};

export type UnregisterInputPortDto = {
  identifier: string;
  token?: string;
};

export type SendMessageInputPortDto = {
  identifier: string;
  token?: string;
  title?: string;
  message: string;
  data?: object;
};

export type FindTokenInputPortDto = {
  identifier: string;
};

export type FirebaseSendMessageInputPortDto = {
  token: string;
  title?: string;
  message: string;
  data?: object;
};

/// Output Port

export type RegisterEmptyOutputPortDto = void;

export type RegisterOutputPortDto = {
  identifier: string;
  token: string;
  platform?: Platform;
  status?: TokenStatus;
};

export type UnregisterOutputPortDto = Array<{
  identifier: string;
  token: string;
  platform?: Platform;
  status?: TokenStatus;
}>;

export type FindTokenOutputPortDto = Array<{
  identifier: string;
  token: string;
  platform?: Platform;
  status?: TokenStatus;
}>;

export type SendMessageOutputPortDto = Array<{
  identifier: string;
  token: string;
  messageStatus?: MessageStatus;
}>;

export type FirebaseSendMessageOutputPortDto = {
  token: string;
  errorCode?: string;
  status: FirebaseMessageStatus;
};

/// Interface

export interface TokenPort {
  register(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto>;

  unregister(dto: UnregisterInputPortDto): Promise<UnregisterOutputPortDto>;

  findTokenAll(dto: FindTokenInputPortDto): Promise<FindTokenOutputPortDto>;
}

export interface SendPort {
  sendMessage(dto: SendMessageInputPortDto): Promise<SendMessageOutputPortDto>;
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
