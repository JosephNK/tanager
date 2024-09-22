import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TanagerExceptionFilter } from '@app/exceptions';
// import { Logger } from '@nestjs/common';
import { InboundModule } from './inbound.module';
import { MyLoggerService } from '@app/commons';

// const logger = new Logger('Blog');

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(InboundModule, {
    bufferLogs: true,
  });

  // Logger
  const logger = app.get(MyLoggerService);
  app.useLogger(logger);

  // Filters Setup
  app.useGlobalFilters(new TanagerExceptionFilter());

  // MicroService Setup
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.MICROSERVICE_INBOUND_PORT),
    },
  });

  // MicroService Start
  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
