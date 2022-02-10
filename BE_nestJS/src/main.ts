import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // true이면 아무 decorator도 없는 어떠한 property 오브젝트도 거른다.
      forbidNonWhitelisted: true, // 존재해서는 안되는 값이라고 알려줌
      transform: true, // 우리가 원하는 타입으로 바꿔줘. 우리 로직에서 id: string으로 헀던걸 이제 number로 바꾸자.
    }),
  );
  await app.listen(3000);
}
bootstrap();
