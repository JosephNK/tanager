export enum UncatchedExceptionCodeEnum {
  UnCatched = '0001',
}

export enum AuthExceptionCodeEnum {
  EmailNotFound = '0001',
  NotAuthenticated = '0002',
  EmailExists = '0003',
  JwtInvalidToken = '0004',
  JwtUserNotFound = '0005',
  JwtExpired = '0006',
  JwtInvalidSignature = '0007',
  UserNotFound = '0008',
}
