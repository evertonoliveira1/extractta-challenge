import 'winston-daily-rotate-file';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: winston.Logger;

  constructor() {
    const transport = new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, message }) => {
          return `${timestamp} - ${message}`;
        }),
      ),
      transports: [new winston.transports.Console(), transport],
    });
  }

  use = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

      this.logger.info(message);
    });

    next();
  };
}
