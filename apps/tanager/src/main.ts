import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TanagerExceptionFilter, RpcExceptionFilter } from '@app/exceptions';
import { TransformInterceptor } from '@app/interceptors';

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new TanagerExceptionFilter(), new RpcExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
}
bootstrap();
