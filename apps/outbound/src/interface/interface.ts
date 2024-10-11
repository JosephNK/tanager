import { SendMessageInputPortDto } from '@app/commons';
import { FirebaseToken } from '../database/entity/firebase.token.entity';
import { FirebaseMessageLog } from '../database/entity/firebase.message.log.entity';

export interface ISendMessageProsess {
  processSendMessage(
    dto: SendMessageInputPortDto,
    messageData: string,
    tokens: FirebaseToken[],
  ): Promise<FirebaseMessageLog[]>;
}

export interface IRegisterProsess {
  processSendMessage(
    dto: SendMessageInputPortDto,
    messageData: string,
    tokens: FirebaseToken[],
  ): Promise<FirebaseMessageLog[]>;
}
