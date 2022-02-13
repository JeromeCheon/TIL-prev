import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  // nest가 제공해주는 mapped-types에 있는 PartialType 사용
  // 이것은 base parameter를 필요로 하는데, 여기에 기존에 생성한 CreateMovieDto를 넣어줌으로써
  // 해당 Dto 안에 있는 값들을 '선택적'으로 받을 수 있게 해준다.
}
