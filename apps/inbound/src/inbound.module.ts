import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InboundController } from './inbound.controller';
import { InboundFirebaseController } from './inbound.firebase.controller';
import { InboundService } from './inbound.service';
import { InboundFirebaseService } from './inbound.firebase.service';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/inbound/.env.${process.env.NODE_ENV}`,
      validate,
    }),
  ],
  controllers: [InboundController, InboundFirebaseController],
  providers: [InboundService, InboundFirebaseService],
})
export class InboundModule {}
