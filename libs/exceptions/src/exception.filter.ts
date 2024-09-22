import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { BaseException } from './base.exception.interface';
import { UndefinedException } from './exception';
import {
  FailedCommonResponse,
  ErrorResponseData,
  MyLoggerService,
} from '@app/commons';

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

    const faildResponse = new FailedCommonResponse();
    const errorResponse = new ErrorResponseData();
    errorResponse.errorCode = res.errorCode;
    errorResponse.errorMessage = res.errorMessage;
    errorResponse.statusCode = res.statusCode;
    errorResponse.timestamp = res.timestamp;
    errorResponse.path = res.path;
    faildResponse.error = errorResponse;

    response
      .status(res.statusCode)
      .json(new ErrorResponse(faildResponse.toJSON()).toJSON());
  }
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: MyLoggerService) {}

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const error: any = exception.getError();

    const status = error.status;
    const timestamp = new Date().getTime().toString();
    const path = request.url;

    const faildResponse = new FailedCommonResponse();
    const errorResponse = new ErrorResponseData();

    this.logger.error('RpcExceptionFilter Error', error);

    if (status === 'error') {
      errorResponse.errorCode = '99999';
      errorResponse.errorMessage = error.message;
      errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse.timestamp = timestamp;
      errorResponse.path = path;
    } else {
      errorResponse.errorCode = error.errorCode;
      errorResponse.errorMessage = error.errorMessage;
      errorResponse.statusCode = error.statusCode;
      errorResponse.timestamp = timestamp;
      errorResponse.path = path;
    }

    faildResponse.error = errorResponse;

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse(faildResponse.toJSON()).toJSON());
  }
}
