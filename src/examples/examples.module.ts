import { Module } from '@nestjs/common';
import { ExamplesController } from './examples.controller';
import { ExamplesService } from './examples.service';
import { PushNotificationModule } from '@packages/push-notification';

@Module({
  imports: [
    PushNotificationModule.forRoot({
      firebaseServcieKeyFile: '',
    }),
  ],
  controllers: [ExamplesController],
  providers: [ExamplesService],
})
export class ExamplesModule {}
