import { Injectable } from '@nestjs/common';

export interface PushNotificationOptions {
  firebaseServcieKeyFile: string;
}

@Injectable()
export class PushNotificationOptionsProvider {
  constructor(private readonly options: PushNotificationOptions) {}

  getOptions(): PushNotificationOptions {
    return this.options;
  }

  getFirebaseServiceKeyFile(): string {
    return this.options.firebaseServcieKeyFile;
  }
}
