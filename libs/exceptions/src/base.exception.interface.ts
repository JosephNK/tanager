import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IBaseException {
  errorCode: string;
  timestamp: string;
  statusCode: number;
  path: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}
