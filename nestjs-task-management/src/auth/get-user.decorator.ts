import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    //data 라는 것은 안 쓰니까 eslint 에러 방지를 위해 underscore 넣자
    // context의 http request로 바꿔주는 메서드를 호출하고 할당한다.
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
