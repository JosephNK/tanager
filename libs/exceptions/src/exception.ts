import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception.interface';
import {
  AuthExceptionCodeEnum,
  UncatchedExceptionCodeEnum,
} from './exception.enum';

export class UnCatchedException extends BaseException {
  constructor() {
    super(
      UncatchedExceptionCodeEnum.UnCatched,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class UserNotFoundException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.UserNotFound, HttpStatus.NOT_FOUND);
  }
}
