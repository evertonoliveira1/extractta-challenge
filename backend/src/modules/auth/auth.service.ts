import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    const userFound = await this.usersService.validateUser(
      user.username,
      user.password,
    );

    if (!userFound) {
      throw new UnauthorizedException();
    }

    this.logger.log(`Usuário logado: ${user.username}`);

    return {
      access_token: this.jwtService.sign(payload),
      userId: user.userId,
    };
  }
}
