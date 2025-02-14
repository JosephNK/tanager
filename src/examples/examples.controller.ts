import { Controller, Get } from '@nestjs/common';
import { ExamplesService } from './examples.service';
import { PushNotificationSendMessageDTO } from '@packages/push-notification';
import {
  ExampleSendMessageRequestDTO,
  ExampleSendMessageResponseDTO,
} from './examples.dto';

@Controller('api')
export class ExamplesController {
  constructor(private readonly appService: ExamplesService) {}

  @Get('test')
  test(): Promise<String> {
    return this.appService.doSomething();
  }

  sendMessage(
    requestDto: ExampleSendMessageRequestDTO,
  ): Promise<ExampleSendMessageResponseDTO> {
    return this.appService.sendPushMessage(requestDto);
  }
}
