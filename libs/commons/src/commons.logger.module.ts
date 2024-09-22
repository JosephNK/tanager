import { Module } from '@nestjs/common';
import { MyLoggerService } from './commons.logger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class MyLoggerModule {}
