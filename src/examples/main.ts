import { NestFactory } from '@nestjs/core';
import { ExamplesModule } from './examples.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExamplesModule, {
    bufferLogs: true,
  });

  // // 전역 파이프 설정 - 유효성 검사
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // DTO에 정의되지 않은 속성 제거
  //     forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 막음
  //     transform: true, // 수신된 데이터를 DTO 타입으로 자동 변환
  //   }),
  // );

  // // CORS 설정
  // app.enableCors();

  // 글로벌 프리픽스 설정 (선택사항)
  // app.setGlobalPrefix('api');

  await app.listen(3000, () => {
    console.log(`Examples Server is listening on port ${3000}`);
  });
}
bootstrap();
