import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 여기 Strategy라는 것은 passport-jwt라는 것에서 불러왔다.
  // 그 다음 여기서 DI를 하자
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    // 한편, derived, 파생된 클래스는 super라는 것을 내부에서 정의해줄 필요가 있다.
    super({
      // 여기서 options 제공해줘야
      secretOrKey: 'topSecret51', // 이건 auth.module에서 가져왔어
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });
    // user가 findOne에서 못 찾게 되면서 존재하지 않으면
    if (!user) {
      throw new UnauthorizedException();
    }
    // 자 return type은 Promise지 왜? asynchronous
    return user;
  }
}
