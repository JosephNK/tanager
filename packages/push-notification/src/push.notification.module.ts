import { Module, DynamicModule } from '@nestjs/common';
import { PushNotificationService } from './push.notification.service';
import {
  PushNotificationOptions,
  PushNotificationOptionsProvider,
} from './push.notification.options';

@Module({})
export class PushNotificationModule {
  static forRoot(options: PushNotificationOptions): DynamicModule {
    if (!options) {
      throw new Error('PushNotificationOptions is required');
    }

    return {
      module: PushNotificationModule,
      providers: [
        {
          provide: PushNotificationOptionsProvider,
          useValue: new PushNotificationOptionsProvider(options),
        },
        PushNotificationService,
      ],
      exports: [PushNotificationService],
    };
  }
}
