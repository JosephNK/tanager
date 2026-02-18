import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TanagerExceptionFilter, RpcExceptionFilter } from '@app/exceptions';
import { TransformInterceptor } from '@app/interceptors';
import { MyLoggerService, setupSwagger } from '@app/commons';
import parseUrl from 'parse-url';

async function bootstrap() {
  const uri = process.env.TANAGER_URI;
  const parseUri = parseUrl(uri);
  const port = parseUri.port;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Logger
  const logger = app.get(MyLoggerService);
  app.useLogger(logger);

  // Filters
  app.useGlobalFilters(
    new TanagerExceptionFilter(logger),
    new RpcExceptionFilter(logger),
  );

  // Interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  setupSwagger(app);

  await app.listen(port, () => {
    console.log(`Tanager Server is listening on port ${port}`);
  });
}
bootstrap();
