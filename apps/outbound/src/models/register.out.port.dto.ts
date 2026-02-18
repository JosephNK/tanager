import { ApiProperty } from '@nestjs/swagger';
import { FirebaseRegisterDto } from './firebase.register.dto';
import { Platform, Provider, TokenStatus } from '@app/commons';
import { FirebaseRegisterStatusDto } from './firebase.register.status.dto';

export class RegisterOutPortDto {
  @ApiProperty({
    example: '[jack@gmail.com, daniel@gmail.com, jackDaniel]',
    description:
      "This could be the recipient's email address, or it could be the recipient's unique ID value.",
    required: true,
  })
  firebase: FirebaseRegisterStatusDto;
}
