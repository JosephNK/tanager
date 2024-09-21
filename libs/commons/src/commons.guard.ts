import { ContentTypeInvalidException } from '@app/exceptions';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeApplicationJsonGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const contentType = request.headers['content-type'];

    if (!contentType || contentType !== 'application/json') {
      throw new ContentTypeInvalidException();
    }

    return true;
  }
}
