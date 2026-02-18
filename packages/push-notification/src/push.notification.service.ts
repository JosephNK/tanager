import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  PushNotificationOptions,
  PushNotificationOptionsProvider,
} from './push.notification.options';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
import {
  PushNotificationSendMessageDTO,
  PushNotificationSendMessageResponseDTO,
} from './push.notification.dto';
import { FirebaseSendMessageStatus } from './push.notification.enums';

@Injectable()
export class PushNotificationService implements OnModuleInit {
  constructor(
    private readonly optionsProvider: PushNotificationOptionsProvider,
  ) {}

  onModuleInit() {
    this.initializeFirebase();
  }

  async initializeFirebase() {
    const filePath = `${this.optionsProvider.getFirebaseServiceKeyFile()}`;
    console.log('filePath', filePath);
    try {
      const data = await readFile(filePath, 'utf8');
      console.log('data', data);
      const firebaseConfig = JSON.parse(data);
      const firebase_params = {
        type: firebaseConfig.type,
        projectId: firebaseConfig.project_id,
        privateKeyId: firebaseConfig.private_key_id,
        privateKey: firebaseConfig.private_key,
        clientEmail: firebaseConfig.client_email,
        clientId: firebaseConfig.client_id,
        authUri: firebaseConfig.auth_uri,
        tokenUri: firebaseConfig.token_uri,
        authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
        clientC509CertUrl: firebaseConfig.client_x509_cert_url,
      };
      admin.initializeApp({
        credential: admin.credential.cert(firebase_params),
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error('Firebase config file not found:', filePath);
        throw new Error(
          `Firebase configuration file not found at: ${filePath}`,
        );
      }
    }
  }

  doSomething(): Promise<string> {
    return Promise.resolve('Hello World!');
  }

  async sendMessage(
    dto: PushNotificationSendMessageDTO,
  ): Promise<PushNotificationSendMessageResponseDTO> {
    const payload = {
      token: dto.token,
      notification: {
        title: dto.title,
        body: dto.message,
      },
      data: dto.data,
    };

    const result = await admin
      .messaging()
      .send(payload)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        return this.toSendMessageResponse(dto.token, null);
      })
      .catch((error) => {
        console.log('Failed send message:', error);
        return this.toSendMessageResponse(dto.token, error.code);
      });

    return result;
  }

  // Firebase Messaging 에러 정의
  // https://firebase.google.com/docs/cloud-messaging/send-message?hl=ko
  private toSendMessageResponse(
    token: string,
    errorCode?: string,
  ): PushNotificationSendMessageResponseDTO {
    const outputDto = new PushNotificationSendMessageResponseDTO();
    outputDto.token = token;
    outputDto.errorCode = errorCode;

    if (!errorCode) {
      outputDto.messageStatus = null;
      return outputDto;
    }

    switch (errorCode) {
      case 'messaging/invalid-argument':
        // FCM 메서드에 잘못된 인수가 제공되었습니다. 오류 메시지에 추가 정보가 들어 있습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_DATA;
        break;

      case 'messaging/invalid-recipient':
        // 의도된 메시지 수신자가 잘못되었습니다. 오류 메시지에 추가 정보가 들어 있습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_DATA;
        break;

      case 'messaging/invalid-payload':
        // 잘못된 메시지 페이로드 객체가 제공되었습니다. 오류 메시지에 추가 정보가 들어 있습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_DATA;
        break;

      case 'messaging/invalid-data-payload-key':
        // 데이터 메시지 페이로드에 잘못된 키가 있습니다. 제한되는 키는 DataMessagePayload 참조 문서를 확인하세요.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_DATA;
        break;

      case 'messaging/payload-size-limit-exceeded':
        // 제공된 메시지 페이로드가 FCM 크기 한도를 초과합니다. 대부분의 메시지는 4,096바이트로 제한됩니다.
        // 주제로 보낸 메시지는 2,048바이트로 제한됩니다. 전체 페이로드 크기에는 키와 값이 모두 포함됩니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.LIMITED;
        break;

      case 'messaging/invalid-options':
        // 잘못된 메시지 옵션 객체가 제공되었습니다. 오류 메시지에 추가 정보가 들어 있습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_DATA;
        break;

      case 'messaging/invalid-registration-token':
        // 잘못된 등록 토큰이 제공되었습니다. FCM에 등록할 때 클라이언트 앱이 수신하는 등록 토큰과 일치하는지 확인합니다.
        // 문자를 자르거나 추가하지 마세요.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_TOKEN;
        break;

      case 'messaging/registration-token-not-registered':
        // registration-token-not-registered제공된 등록 토큰이 등록되지 않았습니다.
        // 이전에 유효했던 등록 토큰이 다음을 비롯한 여러 가지 이유로 등록 취소되었을 수 있습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_TOKEN;
        break;

      case 'messaging/invalid-package-name':
        // 메시지를 보낼 대상으로 지정한 등록 토큰의 패키지 이름이 제공된 restrictedPackageName 옵션과 일치하지 않습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INVALID_DATA;
        break;

      case 'messaging/message-rate-exceeded':
        // 특정 대상으로 전달되는 메시지 비율이 너무 높습니다. 이 기기 또는 주제로 보내는 메시지 수를 줄이세요. 이 대상으로 바로 다시 보내도록 시도해서는 안 됩니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.EXCEEDED;
        break;

      case 'messaging/topics-message-rate-exceeded':
        // 특정 주제의 구독자에게 전달되는 메시지 비율이 너무 높습니다. 이 주제로 보내는 메시지 수를 줄이세요. 바로 다시 보내도록 시도해서는 안 됩니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.EXCEEDED;
        break;
      case 'messaging/too-many-topics':
        // 등록 토큰에서 구독하는 주제 수가 최대값에 도달하여 더 이상 구독할 수 없습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.TOO_MANY_TOPICS;
        break;

      case 'messaging/invalid-apns-credentials':
        // 필수 APN SSL 인증서가 업로드되지 않았거나 만료되어 Apple 기기를 대상으로 메시지를 보낼 수 없습니다. 개발 및 프로덕션 인증서의 유효성을 확인하세요.
        outputDto.messageStatus = FirebaseSendMessageStatus.CERDENTIALS;
        break;

      case 'messaging/mismatched-credential':
        // 이 SDK를 인증하는 데 사용된 인증 정보에, 제공된 등록 토큰에 해당하는 기기로 메시지를 보낼 권한이 없습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.CERDENTIALS;
        break;

      case 'messaging/authentication-error':
        // SDK에서 FCM 서버에 인증할 수 없습니다. FCM 메시지를 보낼 적절한 권한이 있는 인증 정보를 사용하여 Firebase Admin SDK를 인증해야 합니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.AUTH;
        break;

      case 'messaging/server-unavailable':
        // unavailable	FCM 서버에서 시간 내에 요청을 처리하지 못했습니다. 동일한 요청을 다시 시도하되 다음을 수행해야 합니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.UNAVAILABLE;
        break;

      case 'messaging/internal-error':
        // 요청을 처리하려고 시도하는 중에 FCM 서버에서 오류가 발생했습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.INTERNAL;
        break;

      case 'messaging/unknown-error':
        // 알 수 없는 서버 오류가 반환되었습니다.
        outputDto.messageStatus = FirebaseSendMessageStatus.UNKNOWN;
        break;
    }

    return outputDto;
  }
}
