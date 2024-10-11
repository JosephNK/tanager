import { ApiProperty } from '@nestjs/swagger';

export class OptionalDto {
  constructor(token?: string, title?: string, message?: string) {
    this.token = token;
    this.title = title;
    this.message = message;
  }

  @ApiProperty({
    example: 'd5ajwj..',
    description: 'This is the token value used in Firebase.',
    required: true,
  })
  token?: string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  message?: string;
}
