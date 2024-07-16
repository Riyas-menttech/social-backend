import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt.stratergy';
import { PassportModule } from '@nestjs/passport';
import { UserAuthGuard } from 'src/guards/user.guard';
import { JwtService } from 'src/JwtService';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: 'mySecret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
      // inject: [ConfigService],
    }),
  ],
  providers: [
    UserResolver,
    UserService,
    JwtStrategy,
    JwtService,
    UserAuthGuard,
  ],
  exports: [JwtModule, JwtService],
  // exports:[UserService]
})
export class UserModule {}
