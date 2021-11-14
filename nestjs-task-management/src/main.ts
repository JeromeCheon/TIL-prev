import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 11/13 피드백 내용: nestjs/common의 내용들은 자주 쓰는 것만 알아둘 필요가 있다.
// 필요할 땐 공식 docs 보고 바로 찾을 수 있도록 훈련이 필요함.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
