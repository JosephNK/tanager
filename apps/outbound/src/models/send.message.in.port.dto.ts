import { ApiProperty } from '@nestjs/swagger';
import { FirebaseMessageDto } from './firebase.message.dto';

export class SendMessageInPortDto {
  @ApiProperty({
    example: '',
    description: 'This is Firebase Message Value',
  })
  firebase: FirebaseMessageDto;
}
