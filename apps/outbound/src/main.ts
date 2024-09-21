import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TanagerExceptionFilter } from '@app/exceptions';
import { OutboundModule } from './outbound.module';

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(OutboundModule);

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
