import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TanagerExceptionFilter } from '@app/exceptions';
import { OutboundModule } from './outbound.module';
import { MyLoggerService } from '@app/commons';
import parseUrl from 'parse-url';

async function bootstrap() {
  const uri = process.env.OUTBOUND_URI;
  const parseUri = parseUrl(uri);
  const port = parseUri.port;

  const app = await NestFactory.create(OutboundModule, {
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
      port: parseInt(process.env.MICROSERVICE_OUTBOUND_PORT),
    },
  });

  // MicroService Start
  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
