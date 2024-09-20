import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception.interface';
import {
  ParamExceptionCodeEnum,
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

export class IdentifierNotFoundException extends BaseException {
  constructor() {
    super(
      ParamExceptionCodeEnum.IdentifierNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class TokenNotFoundException extends BaseException {
  constructor() {
    super(
      ParamExceptionCodeEnum.TokenNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
