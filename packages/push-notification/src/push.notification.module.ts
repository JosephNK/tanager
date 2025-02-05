import { Module, DynamicModule } from '@nestjs/common';
import { PushNotificationService } from './push.notification.service';
import { PushNotificationOptions } from './push.notification.options';
import { PUSH_NOTIFICATION_CONFIG_OPTIONS } from './push.notification.constants';

@Module({
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {
  static forRoot(options?: PushNotificationOptions): DynamicModule {
    return {
      module: PushNotificationModule,
      providers: [
        {
          provide: PUSH_NOTIFICATION_CONFIG_OPTIONS,
          useValue: options,
        },
        PushNotificationService,
      ],
      exports: [PushNotificationService],
    };
  }
}
