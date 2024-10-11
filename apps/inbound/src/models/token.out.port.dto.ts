import { ApiProperty } from '@nestjs/swagger';
import { OptionalDto } from './optional.dto';
import { Platform, TokenStatus } from '@app/commons';

export class TokenOutPortDto {
  @ApiProperty({
    example: '[jack@gmail.com, daniel@gmail.com, jackDaniel]',
    description:
      "This could be the recipient's email address, or it could be the recipient's unique ID value.",
    required: true,
  })
  receiver: string[];

  @ApiProperty()
  optional?: OptionalDto;

  @ApiProperty({
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;

  @ApiProperty({
    enum: [...Object.keys(TokenStatus)],
    enumName: 'TokenStatus',
  })
  tokenStatus?: TokenStatus;
}
