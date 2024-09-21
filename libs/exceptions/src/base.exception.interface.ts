import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IBaseException {
  errorCode: string;
  errorMessage?: string;
  timestamp: string;
  statusCode: number;
  path: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number, errorMessage?: string) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  errorMessage?: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}
