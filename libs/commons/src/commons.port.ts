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

export interface Port {
  resigter(params: RegisterInputPortDto): Promise<RegisterOutputPortDto>;

  unresigter(params: UnregisterInputPortDto): Promise<RegisterOutputPortDto>;

  sendMessage(params: SendMessageInputPortDto): Promise<RegisterOutputPortDto>;

  findTokenAll(params: FindTokenInputPortDto): Promise<RegisterOutputPortDto>;
}

/// Output Port

export type RegisterOutputPortDto = void;
