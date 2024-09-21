import { SendMessageInputPortDto } from '@app/commons';
import { Token } from '../entity/token.entity';
import { MessageLog } from '../entity/message.log.entity';

export interface ISendMessageProsess {
  processSendMessage(
    dto: SendMessageInputPortDto,
    messageData: string,
    tokens: Token[],
  ): Promise<MessageLog[]>;
}
