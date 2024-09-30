import { Platform, TokenStatus } from '@app/commons';
import { ApiProperty } from '@nestjs/swagger';
import { InboundRegisterInputPortDto } from './input.port.dto';

/// Output Port

export class InboundRegisterOutputPortDto {
  @ApiProperty()
  inputPortDto: InboundRegisterInputPortDto;
}
