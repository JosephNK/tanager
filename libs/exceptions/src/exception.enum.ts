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
  InvalidJSON = '20003',
}

export enum DatabaseExceptionCodeEnum {
  FailedRegister = '30000',
  FailedUnregister = '30001',
  TokenNotFound = '30002',
}

export enum FirebaseExceptionCodeEnum {
  FailedMessageSend = '40000',
}

export enum ExceptionErrorMessage {
  Undefined = 'Undefined Error',
  InvalidContentType = 'Invalid Content-Type',
  IdentifierEmpty = 'Identifier must not be empty',
  TokenEmpty = 'Token must not be empty',
  MessageEmpty = 'Message must not be empty',
  InvalidJSON = 'Invalid JSON Data',
  FailedToTokenRegister = 'Failed to Token Register',
  TokenNotFound = 'Token Not Found',
  FailedToTokenUnregister = 'Failed to Token Unregister',
  FailedToFirebaseMessageSend = 'Failed to Firebase Message Send',
}
