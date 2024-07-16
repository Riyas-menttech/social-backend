import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserAuthGuard } from 'src/guards/user.guard';
import { JwtService } from 'src/JwtService';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
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
  providers: [PostResolver, PostService, UserAuthGuard, JwtService],
  exports: [JwtModule, JwtService],
})
export class PostModule {}
