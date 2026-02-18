import { ApiProperty } from '@nestjs/swagger';
import { FirebaseUnregisterStatusDto } from './firebase.unregister.status.dto';

export class UnregisterOutPortDto {
  @ApiProperty({
    example: '',
    description: 'This is Firebase Unregister Value',
  })
  firebase: FirebaseUnregisterStatusDto[];
}
