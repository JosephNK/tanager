import { ApiProperty } from '@nestjs/swagger';
import { OptionalDto } from './optional.dto';
import { Provider } from '../enum/enum';

export class UnregisterInPortDto {
  @ApiProperty({
    example: '[jack@gmail.com, daniel@gmail.com, jackDaniel]',
    description:
      "This could be the recipient's email address, or it could be the recipient's unique ID value.",
    required: true,
  })
  receiver: string[];

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
