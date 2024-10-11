import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '@app/commons';

export class FirebaseUnregisterDto {
  @ApiProperty({
    example: 'jack@gmail.com or jackDaniel',
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
    example: 'IOS',
    description: 'This is a Platform property.',
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;
}
