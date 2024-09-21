import {
  FindTokenOutputPortDto,
  RegisterOutputPortDto,
  SendMessageOutputPortDto,
  UnregisterOutputPortDto,
} from '@app/commons';
import { ApiProperty } from '@nestjs/swagger';

/// Success Response

export class SuccessRegisterResponse {
  @ApiProperty()
  data: RegisterOutputPortDto;
}

export class SuccessUnregisterResponse {
  @ApiProperty()
  data: UnregisterOutputPortDto;
}

export class SuccessFindTokenResponse {
  @ApiProperty({
    isArray: true,
  })
  data: FindTokenOutputPortDto;
}

export class SuccessSendMessageResponse {
  @ApiProperty({
    isArray: true,
  })
  data: SendMessageOutputPortDto;
}

/// Error Response

export class ErrorResponseData {
  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  errorMessage: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  toJSON() {
    return {
      errorCode: this.errorCode,
      errorMessage: this.errorMessage,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      path: this.path,
    };
  }
}

export class FailedCommonResponse {
  @ApiProperty()
  error: ErrorResponseData;

  toJSON() {
    return this.error.toJSON();
  }
}
