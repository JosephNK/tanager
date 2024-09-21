import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboundController } from './outbound.controller';
import { OutboundService } from './outbound.service';
import { validate } from './env/env.validation';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfig } from './database/typeorm.config';
import { Token } from './entity/token.entity';
import { FirebaseService } from './firebase/firebase.service';
import { MessageLog } from './entity/message.log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/outbound/.env.${process.env.NODE_ENV}`,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    TypeOrmModule.forFeature([Token, MessageLog]),
  ],
  controllers: [OutboundController],
  providers: [OutboundService, FirebaseService],
})
export class OutboundModule {}
