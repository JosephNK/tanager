import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { BaseException } from './base.exception.interface';
import {
  UndefinedExceptionCodeEnum,
  RequestDataExceptionCodeEnum,
  ContentTypeExceptionCodeEnum,
  DatabaseExceptionCodeEnum,
} from './exception.enum';

export class UndefinedException extends BaseException {
  constructor() {
    super(
      UndefinedExceptionCodeEnum.Undefined,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Undefined Error',
    );
  }
}

export class ContentTypeInvalidException extends BaseException {
  constructor() {
    super(
      ContentTypeExceptionCodeEnum.Invalid,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Invalid Content-Type',
    );
  }
}

export class IdentifierNotFoundException extends BaseException {
  constructor() {
    super(
      RequestDataExceptionCodeEnum.IdentifierNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Identifier must not be empty',
    );
  }
}

export class TokenNotFoundException extends BaseException {
  constructor() {
    super(
      RequestDataExceptionCodeEnum.TokenNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Token must not be empty',
    );
  }
}

export class DatabaseTokenSaveException extends BaseException {
  constructor(errorMessage?: string) {
    super(
      DatabaseExceptionCodeEnum.FailedSave,
      HttpStatus.INTERNAL_SERVER_ERROR,
      `Failed to Token Save Detail is ${errorMessage}` ??
        'Failed to Token Save',
    );
  }
}

export function toException(exception: BaseException, isRPC: boolean) {
  if (isRPC) {
    return new RpcException(exception);
  } else {
    return exception;
  }
}
