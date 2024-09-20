import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { BaseException } from './base.exception.interface';
import { UnCatchedException } from './exception';

@Catch()
export class TanagerExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

    res.timestamp = new Date().getTime().toString();
    res.path = request.url;

    response.status(res.statusCode).json({
      errorCode: res.errorCode,
      statusCode: res.statusCode,
      timestamp: res.timestamp,
      path: res.path,
    });
  }
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const timestamp = new Date().getTime().toString();
    const path = request.url;

    response.status(500).json({
      errorCode: error,
      statusCode: 500,
      timestamp: timestamp,
      path: path,
    });
  }
}
