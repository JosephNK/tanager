import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TanagerExceptionFilter, RpcExceptionFilter } from '@app/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TanagerExceptionFilter(), new RpcExceptionFilter());
  await app.listen(3000);
}
bootstrap();
