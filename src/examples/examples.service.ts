import { Injectable } from '@nestjs/common';
import { PushNotificationService } from '@packages/push-notification';

@Injectable()
export class ExamplesService {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async test(): Promise<String> {
    try {
      return this.pushNotificationService.doSomething();
    } catch (error) {
      throw error;
    }
  }
}
