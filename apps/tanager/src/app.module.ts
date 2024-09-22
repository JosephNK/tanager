import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './env/env.validation';
import { MyLoggerModule } from '@app/commons';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/tanager/.env.${process.env.NODE_ENV}`,
      validate,
    }),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
