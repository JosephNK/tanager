import { Injectable } from '@nestjs/common';
import {
  FirebaseSendMessageStatus,
  PushNotificationSendMessageDTO,
  PushNotificationService,
} from '@packages/push-notification';
import {
  ExampleSendMessageRequestDTO,
  ExampleSendMessageResponseDTO,
} from './examples.dto';

@Injectable()
export class ExamplesService {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  doSomething(): Promise<String> {
    return this.pushNotificationService.doSomething();
  }

  async sendPushMessage(
    requestDto: ExampleSendMessageRequestDTO,
  ): Promise<ExampleSendMessageResponseDTO> {
    const dto = new PushNotificationSendMessageDTO(
      requestDto.token,
      requestDto.title,
      requestDto.message,
      requestDto.data,
    );
    const result = await this.pushNotificationService.sendMessage(dto);
    const messageStatus = result.messageStatus;

    // TODO: 비지니스 로직 처리
    switch (messageStatus) {
      case FirebaseSendMessageStatus.INVALID_DATA:
        break;
      case FirebaseSendMessageStatus.LIMITED:
        break;
      case FirebaseSendMessageStatus.INVALID_TOKEN:
        break;
      case FirebaseSendMessageStatus.EXCEEDED:
        break;
      case FirebaseSendMessageStatus.TOO_MANY_TOPICS:
        break;
      case FirebaseSendMessageStatus.AUTH:
        break;
      case FirebaseSendMessageStatus.CERDENTIALS:
        break;
      case FirebaseSendMessageStatus.UNAVAILABLE:
        break;
      case FirebaseSendMessageStatus.INTERNAL:
        break;
      case FirebaseSendMessageStatus.UNKNOWN:
        break;
    }

    return new ExampleSendMessageResponseDTO(
      result.token,
      result.errorCode,
      !messageStatus,
    );
  }
}
