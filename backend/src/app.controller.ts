import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

interface SuccessFullResponse {
  success: boolean;
  message: string;
  datetime: Date;
}

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  index(): SuccessFullResponse {
    return {
      success: true,
      message: 'OK',
      datetime: new Date(),
    };
  }

  @Get('liveness')
  livenessCheck(): SuccessFullResponse {
    return {
      success: true,
      message: 'OK',
      datetime: new Date(),
    };
  }

  @Get('readiness')
  async readinessCheck(): Promise<SuccessFullResponse> {
    try {
      await this.connection.db.admin().ping();
      return {
        success: true,
        message: 'OK',
        datetime: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Service Unavailable',
        datetime: new Date(),
      };
    }
  }
}
