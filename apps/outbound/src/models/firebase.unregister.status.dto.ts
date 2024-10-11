import { ApiProperty } from '@nestjs/swagger';
import { FirebaseRegisterDto } from './firebase.register.dto';
import { Platform, Provider, TokenStatus } from '@app/commons';

export class FirebaseUnregisterStatusDto {
  @ApiProperty({
    example: '[jack@gmail.com, daniel@gmail.com, jackDaniel]',
    description:
      "This could be the recipient's email address, or it could be the recipient's unique ID value.",
    required: true,
  })
  receiver: string;

  @ApiProperty({
    example: 'd5ajwj..',
    description: 'This is the token value used in Firebase.',
  })
  token?: string;

  @ApiProperty({
    enum: [...Object.keys(TokenStatus)],
    enumName: 'TokenStatus',
  })
  tokenStatus?: TokenStatus;

  @ApiProperty({
    example: 'FIREBASE',
    description: 'This is a provider-specified property.',
    enum: [...Object.keys(Provider)],
    enumName: 'Provider',
    required: true,
  })
  provider: Provider;

  @ApiProperty({
    example: 'IOS',
    description: 'This is a Platform property.',
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;
}
