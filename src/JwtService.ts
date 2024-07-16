import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  decodeToken(token: string) {
    try {
      return this.jwtService.decode(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
