import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExampleSendMessageRequestDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: {
    [key: string]: string;
  };
}

export class ExampleSendMessageResponseDTO {
  constructor(token: string, errorCode: string, success: boolean) {
    this.token = token;
    this.errorCode = errorCode;
    this.success = success;
  }

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  errorCode?: string;

  @IsBoolean()
  @IsNotEmpty()
  success: boolean;
}
