import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService], // 이걸 만약에 없애면 에러가 나.
  // 그 이유는 이 서비스 안에 Movie에 관한 전반적인 dependency들이 inject되어 맞물려 있기 때문
  // 따라서 dependency injection 이라는 개념을 잘 아는 것이 중요하다.
})
export class MoviesModule {}
