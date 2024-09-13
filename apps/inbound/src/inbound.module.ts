import { Module } from '@nestjs/common';
import { InboundController } from './inbound.controller';
import { InboundService } from './inbound.service';

@Module({
  imports: [],
  controllers: [InboundController],
  providers: [InboundService],
})
export class InboundModule {}
