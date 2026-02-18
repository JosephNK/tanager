import { ApiProperty } from '@nestjs/swagger';
import { FirebaseMessageLog } from '../database/entity/firebase.message.log.entity';

export class FirebaseMessageStatusDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  messageLogs: FirebaseMessageLog[];
}
