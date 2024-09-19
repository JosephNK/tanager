import { InboundRegisterOutputPortDto } from './inbound.output.port';

/// Input Port

export type InboundRegisterInputPortDto = {
  id: string;
  token: string;
};

export type InboundUnregisterInputPortDto = {
  id: string;
  token?: string;
};

export type InboundSendMessageInputPortDto = {
  id: string;
  token?: string;
  title?: string;
  message: string;
};

export type InboundFindTokenInputPortDto = {
  id: string;
};

export interface InboundPort {
  resigter(
    params: InboundRegisterInputPortDto,
  ): Promise<InboundRegisterOutputPortDto>;

  unresigter(
    params: InboundUnregisterInputPortDto,
  ): Promise<InboundRegisterOutputPortDto>;

  sendMessage(
    params: InboundSendMessageInputPortDto,
  ): Promise<InboundRegisterOutputPortDto>;

  findTokenAll(
    params: InboundFindTokenInputPortDto,
  ): Promise<InboundRegisterOutputPortDto>;
}
