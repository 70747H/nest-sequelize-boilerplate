import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { message } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message,
    };
    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}