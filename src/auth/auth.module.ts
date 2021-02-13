import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  JwtModule.register({
    secret: 'super-secret',
    signOptions: {
      expiresIn: 18000,
    },
  }),
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
