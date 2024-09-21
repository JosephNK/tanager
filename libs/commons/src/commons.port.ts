import { Platform, TokenStatus } from '@app/commons';

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
};

export type FindTokenInputPortDto = {
  identifier: string;
};

export type FirebaseSendMessageInputPortDto = {
  token: string;
  title?: string;
  message: string;
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

export type SendMessageOutputPortDto = Array<{
  identifier: string;
  token: string;
  platform?: Platform;
  status?: TokenStatus;
}>;

export type FirebaseSendMessageOutputPortDto = {
  token: string;
  response?: any;
  errorCode?: string;
};

///

export interface TokenPort {
  register(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto>;

  unregister(dto: UnregisterInputPortDto): Promise<UnregisterOutputPortDto>;

  findTokenAll(dto: FindTokenInputPortDto): Promise<RegisterEmptyOutputPortDto>;
}

export interface SendPort {
  sendMessage(dto: SendMessageInputPortDto): Promise<SendMessageOutputPortDto>;
}
