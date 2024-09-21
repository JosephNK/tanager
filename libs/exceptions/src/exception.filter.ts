import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { BaseException } from './base.exception.interface';
import { UndefinedException } from './exception';

class ErrorResponse {
  error: object;

  constructor(error: object) {
    this.error = error;
  }

  toJSON() {
    return {
      error: this.error,
    };
  }
}

@Catch()
export class TanagerExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UndefinedException();

    res.timestamp = new Date().getTime().toString();
    res.path = request.url;

    response.status(res.statusCode).json(
      new ErrorResponse({
        errorCode: res.errorCode,
        errorMessage: res.errorMessage,
        statusCode: res.statusCode,
        timestamp: res.timestamp,
        path: res.path,
      }).toJSON(),
    );
  }
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const error: any = exception.getError();

    const status = error.status;
    const timestamp = new Date().getTime().toString();
    const path = request.url;

    if (status === 'error') {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        new ErrorResponse({
          errorCode: '99999',
          errorMessage: error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: timestamp,
          path: path,
        }).toJSON(),
      );
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        new ErrorResponse({
          errorCode: error.errorCode,
          errorMessage: error.errorMessage,
          statusCode: error.statusCode,
          timestamp: timestamp,
          path: path,
        }).toJSON(),
      );
    }
  }
}
