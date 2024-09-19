import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado: ${id}.`);
    }
    return user;
  }

  async getUserProfile(userId: string): Promise<User | null> {
    return this.userModel
      .findById(userId)
      .select('username email createdAt')
      .exec();
  }

  async findOneByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.findOneByUsername(username);

      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        const { ...result } = user.toObject();
        return result;
      }

      return null;
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      throw new Error('Erro ao validar usuário');
    }
  }
}
