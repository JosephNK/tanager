import { NestFactory } from '@nestjs/core';
import { InboundModule } from './inbound.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AllExceptionFilter } from '@app/exceptions';

const logger = new Logger('Blog');

async function bootstrap() {
  const app = await NestFactory.create(InboundModule);
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(4000);
  // const app = await NestFactory.createMicroservice(InboundModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     // host: 'localhost',
  //     port: 4000,
  //   },
  // });
  // await app.listen();
  // const app = await NestFactory.create(InboundModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: 4000,
  //   },
  // });
  // await app.startAllMicroservices();
  // await app.listen(4000)
}
bootstrap();
