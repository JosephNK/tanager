import { NestFactory } from '@nestjs/core';
import { OutboundModule } from './outbound.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(OutboundModule);
  await app.listen(port);
}
bootstrap();
