import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './modules/user/entities/user.entity';

export interface JwtPayload {
  email: string;
  // You can add more fields to the payload if needed
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    
  ) {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mySecret',
    });
    
  }

  async validate(payload: any) {
    const { email } = payload;
    
    const user = await this.usersRepository.findOne({
      where: { Email: email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
