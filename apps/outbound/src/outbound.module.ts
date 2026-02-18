import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboundController } from './outbound.controller';
import { OutboundService } from './outbound.service';
import { validate } from './env/env.validation';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfig } from './database/typeorm.config';
import { FirebaseToken } from './database/entity/firebase.token.entity';
import { FirebaseMessageLog } from './database/entity/firebase.message.log.entity';
import { MyLoggerModule } from '@app/commons';
import { FirebaseDBService } from './firebase/firebase.db.service';
import { FirebaseMessageService } from './firebase/firebase.message.service';

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
    TypeOrmModule.forFeature([FirebaseToken, FirebaseMessageLog]),
    MyLoggerModule,
  ],
  controllers: [OutboundController],
  providers: [OutboundService, FirebaseMessageService, FirebaseDBService],
})
export class OutboundModule {}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    TypeOrmModule.forFeature([FirebaseToken, FirebaseMessageLog]),
  ],
  controllers: [],
  providers: [OutboundService, FirebaseMessageService, FirebaseDBService],
  exports: [OutboundService],
})
export class OutboundModuleWithoutController {}
