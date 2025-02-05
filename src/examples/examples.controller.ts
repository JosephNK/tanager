import { Controller, Get } from '@nestjs/common';
import { ExamplesService } from './examples.service';

@Controller('api')
export class ExamplesController {
  constructor(private readonly appService: ExamplesService) {}

  @Get('test')
  test(): Promise<String> {
    console.log('test');
    return this.appService.test();
  }
}
