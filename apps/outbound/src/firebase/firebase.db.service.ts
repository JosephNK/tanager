import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseToken } from '../database/entity/firebase.token.entity';
import { Not, Repository } from 'typeorm';
import { getPlatformEnum, getTokenStatusEnum, TokenStatus } from '@app/commons';
import { FirebaseRegisterDto } from '../models/firebase.register.dto';
import { FirebaseRegisterStatusDto } from '../models/firebase.register.status.dto';
import { FirebaseUnregisterDto } from '../models/firebase.unregister.dto';
import { FirebaseUnregisterStatusDto } from '../models/firebase.unregister.status.dto';
import { FirebaseMessageDto } from '../models/firebase.message.dto';
import {
  DatabaseTokenNotFoundException,
  InvalidJSONException,
} from '@app/exceptions';
import { FirebaseMessageService } from './firebase.message.service';
import { FirebaseMessageLog } from '../database/entity/firebase.message.log.entity';
import { FirebaseMessageStatusDto } from '../models/firebase.message.status.dto';

@Injectable()
export class FirebaseDBService {
  constructor(
    @InjectRepository(FirebaseToken)
    private readonly tokenRepository: Repository<FirebaseToken>,
    @InjectRepository(FirebaseMessageLog)
    private readonly messageLogRepository: Repository<FirebaseMessageLog>,
    private readonly firebaseMessageService: FirebaseMessageService,
  ) {}

  async register(
    dto: FirebaseRegisterDto,
    isRPC: boolean,
  ): Promise<FirebaseRegisterStatusDto> {
    const receiver = dto.receiver;
    const token = dto.token;

    // 타사용자 기존 Token Status 변경 (=> USED)
    await this.updateOtherTokenStatusUsed(dto);

    // Insert Or Update
    const firebaseToken: FirebaseToken = new FirebaseToken();
    firebaseToken.receiver = receiver;
    firebaseToken.token = token;
    firebaseToken.platform = getPlatformEnum(dto.platform);
    firebaseToken.status = TokenStatus.VAILD;

    const findToken = await this.tokenRepository.findOne({
      where: [
        {
          receiver: receiver,
          token: token,
        },
      ],
    });

    if (findToken == null) {
      // Insert
      await this.tokenRepository.insert(firebaseToken);
    } else {
      // Update
      firebaseToken.updateAt = new Date();
      await this.tokenRepository.update(findToken.id, firebaseToken);
    }

    // await this.tokenRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Token)
    //   .values([token])
    //   .orUpdate(['token', 'updateAt'], ['token'])
    //   .execute();

    const result = await this.tokenRepository.findOneOrFail({
      where: {
        receiver: firebaseToken.receiver,
        token: firebaseToken.token,
      },
    });

    const outputDto = new FirebaseRegisterStatusDto();
    outputDto.receiver = result.receiver;
    outputDto.token = result.token;
    outputDto.platform = result.platform;
    outputDto.tokenStatus = getTokenStatusEnum(result.status);

    return outputDto;
  }

  async unregister(
    dto: FirebaseUnregisterDto,
    isRPC: boolean,
  ): Promise<FirebaseUnregisterStatusDto[]> {
    const receiver = dto.receiver;
    const token = dto.token;

    const tokens: FirebaseToken[] = await this.tokenRepository.findBy({
      receiver: receiver,
      token: token,
    });

    const resultTokens: FirebaseToken[] = await Promise.all(
      tokens.map(async (token) => {
        const id = token.id;
        await this.tokenRepository.update(id, {
          status: TokenStatus.REVOKED,
          deleteAt: new Date(),
        });
        const result = await this.tokenRepository.findOneOrFail({
          where: {
            id: id,
          },
        });
        return result;
      }),
    );

    return resultTokens.map((resultToken) => {
      const outputDto = new FirebaseUnregisterStatusDto();
      outputDto.receiver = resultToken.receiver;
      outputDto.token = resultToken.token;
      outputDto.platform = resultToken.platform;
      outputDto.tokenStatus = getTokenStatusEnum(resultToken.status);
      return outputDto;
    });
  }

  async sendMessage(
    dto: FirebaseMessageDto,
    isRPC: boolean,
  ): Promise<FirebaseMessageStatusDto> {
    // Data Object to String
    let messageData: string;
    try {
      messageData = this.getMessageDataFrom(dto);
    } catch (error) {
      throw new InvalidJSONException(error);
    }

    // identifier와 token으로 유효한 Token 리스트 가져오기.
    const tokens: FirebaseToken[] = await this.getVaildTokensFrom(dto);

    // Firebase 메세지 보내기 실행
    const messageLogs: FirebaseMessageLog[] =
      await this.firebaseMessageService.processSendMessage(
        dto,
        messageData,
        tokens,
      );

    // Message Logs 저장
    await Promise.all(
      messageLogs.map(async (messageLog) => {
        await this.messageLogRepository.save(messageLog);
      }),
    );

    const outputDto = new FirebaseMessageStatusDto();
    outputDto.messageLogs = messageLogs;

    return outputDto;
  }

  // Privite Method

  private async updateOtherTokenStatusUsed(
    dto: FirebaseRegisterDto,
  ): Promise<void> {
    const receiver = dto.receiver;
    const token = dto.token;

    const otherVaildTokens: FirebaseToken[] = await this.tokenRepository.find({
      where: [
        {
          receiver: Not(receiver),
          token: token,
          status: TokenStatus.ISSUED,
        },
        {
          receiver: Not(receiver),
          token: token,
          status: TokenStatus.VAILD,
        },
      ],
    });
    for (const token of otherVaildTokens) {
      const id = token.id;
      await this.tokenRepository.update(id, {
        status: TokenStatus.USED,
        updateAt: new Date(),
      });
    }

    return;
  }

  private async getVaildTokensFrom(
    dto: FirebaseMessageDto,
  ): Promise<FirebaseToken[]> {
    // receiver & token으로 유효한 Token 리스트 가져오기.
    const receiver = dto.receiver;
    const token = dto.token;
    const tokens: FirebaseToken[] = await this.tokenRepository.find({
      where: [
        {
          receiver: receiver,
          token: token,
          status: TokenStatus.ISSUED,
        },
        {
          receiver: receiver,
          token: token,
          status: TokenStatus.VAILD,
        },
      ],
    });

    if (tokens.length == 0) {
      throw new DatabaseTokenNotFoundException();
    }

    return tokens;
  }

  private getMessageDataFrom(dto: FirebaseMessageDto): string {
    const title = dto.title;
    const message = dto.message;
    const data = dto.data;

    let messageData: string;
    try {
      const defaultData = {
        title: title,
        message: message,
      };
      if (typeof data === 'string') {
        messageData = JSON.stringify({
          ...defaultData,
          data: JSON.parse(data),
        });
      } else {
        messageData = JSON.stringify({
          ...defaultData,
        });
      }
    } catch (error) {
      throw error;
    }

    return messageData;
  }
}
