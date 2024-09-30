import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InboundController } from './inbound.controller';
import { InboundService } from './inbound.service';
import { validate } from './env/env.validation';
import { MyLoggerModule } from '@app/commons';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/inbound/.env.${process.env.NODE_ENV}`,
      validate,
    }),
    MyLoggerModule,
  ],
  controllers: [InboundController],
  providers: [InboundService],
  exports: [InboundService],
})
export class InboundModule {}

@Module({
  imports: [],
  controllers: [],
  providers: [InboundService],
  exports: [InboundService],
})
export class InboundModuleWithoutController {}
