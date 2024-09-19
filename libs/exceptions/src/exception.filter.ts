import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseException } from './base.exception.interface';
import { UnCatchedException } from './exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
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
