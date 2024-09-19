import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

const expiresIn =
  (Number(process.env.JWT_TOKEN_EXPIRATION_MINUTES) || 60) * 60000;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: expiresIn },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
