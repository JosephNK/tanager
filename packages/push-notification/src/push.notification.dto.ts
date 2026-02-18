import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FirebaseSendMessageStatus } from './push.notification.enums';

export class PushNotificationSendMessageDTO {
  constructor(
    token: string,
    title: string,
    message: string,
    data?: { [key: string]: string },
  ) {
    this.token = token;
    this.title = title;
    this.message = message;
    this.data = data;
  }

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: {
    [key: string]: string;
  };
}

export class PushNotificationSendMessageResponseDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  errorCode?: string;

  @IsOptional()
  messageStatus?: FirebaseSendMessageStatus;
}
