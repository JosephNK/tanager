import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TanagerExceptionFilter, RpcExceptionFilter } from '@app/exceptions';
import { TransformInterceptor } from '@app/interceptors';
import { MyLoggerService, setupSwagger } from '@app/commons';

async function bootstrap() {
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Logger
  const logger = app.get(MyLoggerService);
  app.useLogger(logger);

  // Filters
  app.useGlobalFilters(
    new TanagerExceptionFilter(),
    new RpcExceptionFilter(logger),
  );

  // Interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
