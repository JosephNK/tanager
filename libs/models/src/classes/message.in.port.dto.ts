import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../enum/enum';
import { OptionalDto } from './optional.dto';

export class SendMessageInPortDto {
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
}
