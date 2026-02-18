import { ApiProperty } from '@nestjs/swagger';

export class TokenInPortDto {
  @ApiProperty({
    example: '[jack@gmail.com, daniel@gmail.com, jackDaniel]',
    description:
      "This could be the recipient's email address, or it could be the recipient's unique ID value.",
    required: true,
  })
  receiver: string[];
}
