import { Platform } from '@app/commons';

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

/// Output Port

export type RegisterEmptyOutputPortDto = void;

export type RegisterOutputPortDto = {
  identifier: string;
  token: string;
  platform?: Platform;
};

///

export interface TokenPort {
  resigter(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto>;

  unresigter(dto: UnregisterInputPortDto): Promise<RegisterEmptyOutputPortDto>;

  findTokenAll(dto: FindTokenInputPortDto): Promise<RegisterEmptyOutputPortDto>;
}

export interface SendPort {
  sendMessage(dto: SendMessageInputPortDto): RegisterEmptyOutputPortDto;
}
