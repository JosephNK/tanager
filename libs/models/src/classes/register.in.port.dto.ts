import { ApiProperty } from '@nestjs/swagger';
import { OptionalDto } from './optional.dto';
import { Platform, Provider } from '../enum/enum';

export class RegisterInPortDto {
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
    description: 'This is a provider-specified property.',
    enum: [...Object.keys(Provider)],
    enumName: 'Provider',
    required: true,
  })
  provider: Provider;

  @ApiProperty()
  optional?: OptionalDto;

  @ApiProperty({
    example: 'IOS',
    description: 'This is a Platform property.',
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;
}
