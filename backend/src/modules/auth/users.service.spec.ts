import { NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';

import { User, UsersSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let mongoServer: MongoMemoryServer;
  let userModel: Model<User>;

  const mockUser = {
    _id: 'userId',
    username: 'testuser',
    password: 'hashedpassword',
    email: 'test@test.com',
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  describe('create', () => {
    it('should insert a new user with valid data', async () => {
      jest
        .spyOn(userModel.prototype, 'save')
        .mockResolvedValue(mockUser as any);

      const result = await service.create(mockUser);
      expect(result).toEqual(mockUser);
      expect(userModel.prototype.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const findMock = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockUser]),
      });
      jest.spyOn(userModel, 'find').mockImplementation(findMock);

      const users = await service.findAll();
      expect(users).toHaveLength(1);
      expect(users[0]).toEqual(mockUser);
      expect(findMock).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const execMock = jest.fn().mockResolvedValue(mockUser);
      jest
        .spyOn(userModel, 'findById')
        .mockReturnValue({ exec: execMock } as any);

      const result = await service.findOne('userId');
      expect(result).toEqual(mockUser);
      expect(userModel.findById).toHaveBeenCalledWith('userId');
    });

    it('should throw NotFoundException if user not found', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      jest
        .spyOn(userModel, 'findById')
        .mockReturnValue({ exec: execMock } as any);

      await expect(service.findOne('invalidId')).rejects.toThrow(
        NotFoundException,
      );
      expect(userModel.findById).toHaveBeenCalledWith('invalidId');
    });
  });

  describe('getUserProfile', () => {
    it('should return the user profile with selected fields', async () => {
      const execMock = jest.fn().mockResolvedValue({
        username: 'testuser',
        email: 'test@test.com',
        createdAt: new Date(),
      });
      jest.spyOn(userModel, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({ exec: execMock }),
      } as any);

      const result = await service.getUserProfile('userId');
      expect(result).toEqual({
        username: 'testuser',
        email: 'test@test.com',
        createdAt: expect.any(Date),
      });
      expect(userModel.findById).toHaveBeenCalledWith('userId');
    });

    it('should return null if user not found', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      jest.spyOn(userModel, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({ exec: execMock }),
      } as any);

      const result = await service.getUserProfile('invalidId');
      expect(result).toBeNull();
      expect(userModel.findById).toHaveBeenCalledWith('invalidId');
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user by username if found', async () => {
      const execMock = jest.fn().mockResolvedValue(mockUser);
      jest
        .spyOn(userModel, 'findOne')
        .mockReturnValue({ exec: execMock } as any);

      const result = await service.findOneByUsername('testuser');
      expect(result).toEqual(mockUser);
      expect(userModel.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    });

    it('should return null if user by username is not found', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      jest
        .spyOn(userModel, 'findOne')
        .mockReturnValue({ exec: execMock } as any);

      const result = await service.findOneByUsername('nonexistentuser');
      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({
        username: 'nonexistentuser',
      });
    });
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const plainPassword = 'testpass';
      const hashedPassword = 'hashedpassword';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await service.hashPassword(plainPassword);
      expect(result).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
    });
  });

  describe('validateUser', () => {
    it('should return user object if credentials are valid', async () => {
      const mockUserDoc = {
        ...mockUser,
        toObject: jest.fn().mockReturnValue(mockUser),
      };
      jest
        .spyOn(service, 'findOneByUsername')
        .mockResolvedValue(mockUserDoc as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('testuser', 'testpass');
      expect(result).toEqual(mockUser);
      expect(service.findOneByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'testpass',
        mockUser.password,
      );
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(service, 'findOneByUsername').mockResolvedValue(null);

      const result = await service.validateUser('testuser', 'testpass');
      expect(result).toBeNull();
      expect(service.findOneByUsername).toHaveBeenCalledWith('testuser');
    });

    it('should return null if password does not match', async () => {
      const mockUserDoc = {
        ...mockUser,
        toObject: jest.fn().mockReturnValue(mockUser),
      };
      jest
        .spyOn(service, 'findOneByUsername')
        .mockResolvedValue(mockUserDoc as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('testuser', 'wrongpass');
      expect(result).toBeNull();
      expect(service.findOneByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongpass',
        mockUser.password,
      );
    });
  });
});
