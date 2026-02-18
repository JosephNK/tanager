import { ApiProperty } from '@nestjs/swagger';
import { FirebaseRegisterDto } from './firebase.register.dto';

export class RegisterInPortDto {
  @ApiProperty({
    example: '',
    description: 'This is Firebase Register Value',
  })
  firebase?: FirebaseRegisterDto;
}
