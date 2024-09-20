import { NestFactory } from '@nestjs/core';
import { InboundModule } from './inbound.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// import { Logger } from '@nestjs/common';
import { TanagerExceptionFilter } from '@app/exceptions';

// const logger = new Logger('Blog');

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(InboundModule);

  // Filters 설정
  app.useGlobalFilters(new TanagerExceptionFilter());

  // 마이크로서비스 서버 설정
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      //port: parseInt(port),
      host: 'localhost',
      port: 8877,
    },
  });

  // 마이크로서비스 시작
  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
