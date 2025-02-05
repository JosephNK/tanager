import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirebaseToken } from './database/entity/firebase.token.entity';
import {
  DatabaseTokenRegisterException,
  DatabaseTokenUnregisterException,
  toException,
} from '@app/exceptions';
import { FirebaseMessageService } from './firebase/firebase.message.service';
import { FirebaseDBService } from './firebase/firebase.db.service';
import { RegisterInPortDto } from './models/register.in.port.dto';
import { RegisterOutPortDto } from './models/register.out.port.dto';
import { FirebaseRegisterStatusDto } from './models/firebase.register.status.dto';
import { UnregisterInPortDto } from './models/unregister.in.port.dto';
import { UnregisterOutPortDto } from './models/unregister.out.port.dto';
import { FirebaseUnregisterStatusDto } from './models/firebase.unregister.status.dto';
import { SendMessageInPortDto } from './models/send.message.in.port.dto';
import { SendMessageOutPortDto } from './models/send.message.out.port.dto';
import { FirebaseMessageStatusDto } from './models/firebase.message.status.dto';
import { FirebaseMessageLog } from './database/entity/firebase.message.log.entity';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
} from '@app/commons/commons.port';
import { FirebaseRegisterDto } from './models/firebase.register.dto';

@Injectable()
export class OutboundService {
  constructor(
    @InjectRepository(FirebaseToken)
    private readonly tokenRepository: Repository<FirebaseToken>,
    @InjectRepository(FirebaseMessageLog)
    private readonly messageLogRepository: Repository<FirebaseMessageLog>,
    private readonly firebaseMessageService: FirebaseMessageService,
    private readonly firebaseDBService: FirebaseDBService,
  ) {}

  async register(
    dto: RegisterInputPortDto,
    isRPC: boolean,
  ): Promise<RegisterOutputPortDto> {
    try {
      const identifier = dto.identifier;
      const token = dto.token;
      const platform = dto.platform;

      const firebseRegisterDto = new FirebaseRegisterDto();
      firebseRegisterDto.receiver = identifier;
      firebseRegisterDto.token = token;
      firebseRegisterDto.platform = platform;

      const firebaseStatusDto: FirebaseRegisterStatusDto =
        await this.firebaseDBService.register(firebseRegisterDto, isRPC);

      const outputDto = new RegisterOutputPortDto();
      outputDto.identifier = firebaseStatusDto.receiver;
      outputDto.token = firebaseStatusDto.token;
      outputDto.platform = firebaseStatusDto.platform;
      outputDto.tokenStatus = firebaseStatusDto.tokenStatus;

      return outputDto;
    } catch (error) {
      console.error('Error register token:', error);
      throw toException(
        new DatabaseTokenRegisterException(error.detail),
        isRPC,
      );
    }
  }

  async unregister(
    dto: UnregisterInPortDto,
    isRPC: boolean,
  ): Promise<UnregisterOutPortDto> {
    try {
      const firebase = dto.firebase;

      var firebaseStatusDto: FirebaseUnregisterStatusDto[];

      if (firebase !== null) {
        firebaseStatusDto = await this.firebaseDBService.unregister(
          firebase,
          isRPC,
        );
      }

      const outputDto = new UnregisterOutPortDto();
      outputDto.firebase = firebaseStatusDto;

      return outputDto;
    } catch (error) {
      console.error('Error unregister token:', error);
      throw toException(
        new DatabaseTokenUnregisterException(error.detail),
        isRPC,
      );
    }
  }

  async sendMessage(
    dto: SendMessageInPortDto,
    isRPC: boolean,
  ): Promise<SendMessageOutPortDto> {
    try {
      const firebase = dto.firebase;

      var firebaseStatusDto: FirebaseMessageStatusDto;

      if (firebase !== null) {
        firebaseStatusDto = await this.firebaseDBService.sendMessage(
          firebase,
          isRPC,
        );
      }

      const outputDto = new SendMessageOutPortDto();
      outputDto.firebase = firebaseStatusDto;

      return outputDto;
    } catch (error) {
      console.error('Error sendMessage:', error);
      throw toException(error, isRPC);
    }
  }

  // async findTokenAll(
  //   dto: FindTokenInputPortDto,
  //   isRPC: boolean,
  // ): Promise<FindTokenOutputPortDto[]> {
  //   try {
  //     const tokens: FirebaseToken[] = await this.tokenRepository.findBy({
  //       identifier: dto.identifier,
  //     });

  //     return tokens.map((token) => {
  //       const dto = new FindTokenOutputPortDto();
  //       dto.identifier = token.identifier;
  //       dto.token = token.token;
  //       dto.platform = getPlatformEnum(token.platform);
  //       dto.status = getTokenStatusEnum(token.status);
  //       return dto;
  //     });
  //   } catch (error) {
  //     console.error('Error findTokenAll:', error);
  //     throw toException(
  //       new DatabaseTokenNotFoundException(error.detail),
  //       isRPC,
  //     );
  //   }
  // }
}
