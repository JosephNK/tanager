import { Platform, Provider } from '@app/commons';
import { ApiProperty } from '@nestjs/swagger';

/// Input Port

export class InboundOptionalDto {
  @ApiProperty()
  token?: string;
}

export class InboundRegisterInputPortDto {
  @ApiProperty({
    example: '[jack@gmail.com, daniel@gmail.com, jackDaniel]',
    description:
      "This could be the recipient's email address, or it could be the recipient's unique ID value.",
    required: true,
  })
  receiver: string[];

  @ApiProperty({
    example: 'jack@gmail.com',
    description: "This can optionally be the sender's email address.",
  })
  sender?: string;

  @ApiProperty({
    example: 'FIREBASE',
    description: '',
    enum: [...Object.keys(Provider)],
    enumName: 'Provider',
    required: true,
  })
  provider: Provider;

  @ApiProperty()
  optional?: InboundOptionalDto;

  @ApiProperty({
    example: 'IOS',
    description: '',
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;
}
