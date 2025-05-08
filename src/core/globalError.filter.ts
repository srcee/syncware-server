import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { AppErrorBase } from './appErrorBase';
import { LoggerService } from './logger.service';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(
      `${request.method} ${request.url} ${error.message}`,
      error.stack,
    );

    if (error instanceof AppErrorBase) {
      const status = error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message;
      const details = error.details;

      response.status(status).json({
        statusCode: status,
        errorName: error.name,
        message,
        details,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorName: 'InternalServerError',
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
