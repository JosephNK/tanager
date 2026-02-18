import { ApiProperty } from '@nestjs/swagger';
import { FirebaseMessageStatusDto } from './firebase.message.status.dto';

export class SendMessageOutPortDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  firebase: FirebaseMessageStatusDto;
}
