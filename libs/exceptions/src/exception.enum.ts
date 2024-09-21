export enum UndefinedExceptionCodeEnum {
  Undefined = '99999',
}

export enum ContentTypeExceptionCodeEnum {
  Invalid = '10000',
}

export enum RequestDataExceptionCodeEnum {
  IdentifierNotFound = '20000',
  TokenNotFound = '20001',
  MessageNotFound = '20002',
}

export enum DatabaseExceptionCodeEnum {
  FailedRegister = '30000',
  FailedUnregister = '30001',
}

export enum FirebaseExceptionCodeEnum {
  FailedSend = '40000',
}
