import { OutboundRegisterOutputPortDto } from './outbound.output.port';

/// Input Port

export type OutboundRegisterInputPortDto = {
  id: string;
  token: string;
};

export type OutboundUnregisterInputPortDto = {
  id: string;
  token?: string;
};

export type OutboundSendMessageInputPortDto = {
  id: string;
  token?: string;
  title?: string;
  message: string;
};

export type OutboundFindTokenInputPortDto = {
  id: string;
};

export interface OutboundPort {
  resigter(
    params: OutboundRegisterInputPortDto,
  ): Promise<OutboundRegisterOutputPortDto>;

  unresigter(
    params: OutboundUnregisterInputPortDto,
  ): Promise<OutboundRegisterOutputPortDto>;

  findTokenAll(
    params: OutboundFindTokenInputPortDto,
  ): Promise<OutboundRegisterOutputPortDto>;
}
