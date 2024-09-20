import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboundController } from './outbound.controller';
import { OutboundService } from './outbound.service';
import { validate } from './common/env.validation';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeormConfig } from './database/typeorm.config';
import { Token } from './entity/token.entity';

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
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [OutboundController],
  providers: [OutboundService],
})
export class OutboundModule {}
