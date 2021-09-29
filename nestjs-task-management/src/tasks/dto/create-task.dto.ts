import { IsNotEmpty } from 'class-validator'; // value 빈걸 방지하기 위해

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  // 여기에 다른 변수를 추가해도 다른 코드 손댈 필요가 없어
}
