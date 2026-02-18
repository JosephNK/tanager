import { ApiProperty } from '@nestjs/swagger';
import { FirebaseUnregisterDto } from './firebase.unregister.dto';

export class UnregisterInPortDto {
  @ApiProperty({
    example: '',
    description: 'This is Firebase Unregister Value',
  })
  firebase: FirebaseUnregisterDto;
}
