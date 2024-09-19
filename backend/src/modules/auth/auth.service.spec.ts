import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('login', () => {
    it('should return an access token and userId if user is validated', async () => {
      const user = {
        username: 'testuser',
        password: 'testpass',
        userId: '123',
      };
      const payload = { username: 'testuser', sub: '123' };
      const accessToken = 'accessToken';

      jest.spyOn(usersService, 'validateUser').mockResolvedValue(user as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

      const result = await service.login(user);

      expect(usersService.validateUser).toHaveBeenCalledWith(
        user.username,
        user.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({
        access_token: accessToken,
        userId: user.userId,
      });
    });

    it('should throw UnauthorizedException if user is not validated', async () => {
      const user = {
        username: 'testuser',
        password: 'testpass',
        userId: '123',
      };

      jest.spyOn(usersService, 'validateUser').mockResolvedValue(null);

      await expect(service.login(user)).rejects.toThrow(UnauthorizedException);
      expect(usersService.validateUser).toHaveBeenCalledWith(
        user.username,
        user.password,
      );
    });
  });
});
