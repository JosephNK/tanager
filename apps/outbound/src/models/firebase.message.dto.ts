import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '@app/commons';

export class FirebaseMessageDto {
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
    example: 'Welcome to Hello World',
    description: 'This is the title.',
  })
  title?: string;

  @ApiProperty({
    example: 'Hello, Nice to meet you',
    description: 'This is the message.',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: '',
    description: 'This is Json Data.',
  })
  data?: any;

  @ApiProperty({
    example: 'IOS',
    description: 'This is a Platform property.',
    enum: [...Object.keys(Platform)],
    enumName: 'Platform',
  })
  platform?: Platform;
}
