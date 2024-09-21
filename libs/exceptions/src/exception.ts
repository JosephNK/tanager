import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { BaseException } from './base.exception.interface';
import {
  UndefinedExceptionCodeEnum,
  RequestDataExceptionCodeEnum,
  ContentTypeExceptionCodeEnum,
  DatabaseExceptionCodeEnum,
  FirebaseExceptionCodeEnum,
  ExceptionErrorMessage,
} from './exception.enum';

export class UndefinedException extends BaseException {
  constructor() {
    super(
      UndefinedExceptionCodeEnum.Undefined,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ExceptionErrorMessage.Undefined,
    );
  }
}

export class ContentTypeInvalidException extends BaseException {
  constructor() {
    super(
      ContentTypeExceptionCodeEnum.Invalid,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ExceptionErrorMessage.InvalidContentType,
    );
  }
}

export class IdentifierNotFoundException extends BaseException {
  constructor() {
    super(
      RequestDataExceptionCodeEnum.IdentifierNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ExceptionErrorMessage.IdentifierEmpty,
    );
  }
}

export class TokenNotFoundException extends BaseException {
  constructor() {
    super(
      RequestDataExceptionCodeEnum.TokenNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ExceptionErrorMessage.TokenEmpty,
    );
  }
}

export class MessageNotFoundException extends BaseException {
  constructor() {
    super(
      RequestDataExceptionCodeEnum.MessageNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ExceptionErrorMessage.MessageEmpty,
    );
  }
}

export class DatabaseTokenRegisterException extends BaseException {
  constructor(errorMessage?: string) {
    super(
      DatabaseExceptionCodeEnum.FailedRegister,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage
        ? `${ExceptionErrorMessage.FailedToTokenRegister} :: ${errorMessage}`
        : ExceptionErrorMessage.FailedToTokenRegister,
    );
  }
}

export class DatabaseTokenNotFoundException extends BaseException {
  constructor(errorMessage?: string) {
    super(
      DatabaseExceptionCodeEnum.TokenNotFound,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage
        ? `${ExceptionErrorMessage.TokenNotFound} :: ${errorMessage}`
        : ExceptionErrorMessage.TokenNotFound,
    );
  }
}

export class DatabaseTokenUnregisterException extends BaseException {
  constructor(errorMessage?: string) {
    super(
      DatabaseExceptionCodeEnum.FailedUnregister,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage
        ? `${ExceptionErrorMessage.FailedToTokenUnregister} :: ${errorMessage}`
        : ExceptionErrorMessage.FailedToTokenUnregister,
    );
  }
}

export class FirebaseMessageSendException extends BaseException {
  constructor(errorMessage?: string) {
    super(
      FirebaseExceptionCodeEnum.FailedMessageSend,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage
        ? `${ExceptionErrorMessage.FailedToFirebaseMessageSend} :: ${errorMessage}`
        : ExceptionErrorMessage.FailedToFirebaseMessageSend,
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
