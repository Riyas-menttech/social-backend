import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/JwtService';

@Injectable()
export class UserAuthGuard implements CanActivate {
 constructor(private jwtService:JwtService){}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
      const request = ctx.req;      
    const authorization = request.headers.authorization;
      this.jwtService.verifyToken(authorization);
    //   console.log(userCheck, 'chekc');
     this.jwtService.decodeToken(authorization);
    //   console.log(user,'verify');
      
      
    if (!authorization) {
      throw new Error('Authorization header not found');
    }

    // Perform your token validation logic here
    // e.g., validate JWT token and set user in context

    return true;
  }
}
