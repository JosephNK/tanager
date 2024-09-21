import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import {
  RegisterInputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
  RegisterOutputPortDto,
  getPlatformEnum,
  getTokenStatusEnum,
  UnregisterOutputPortDto,
  TokenStatus,
  SendMessageInputPortDto,
  SendMessageOutputPortDto,
  getMessageDataFrom,
  FindTokenOutputPortDto,
} from '@app/commons';
import { Token } from './entity/token.entity';
import {
  DatabaseTokenNotFoundException,
  DatabaseTokenRegisterException,
  DatabaseTokenUnregisterException,
  InvalidJSONException,
  toException,
} from '@app/exceptions';
import { FirebaseService } from './firebase/firebase.service';
import { MessageLog } from './entity/message.log.entity';

@Injectable()
export class OutboundService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(MessageLog)
    private readonly messageLogRepository: Repository<MessageLog>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async register(
    dto: RegisterInputPortDto,
    isRPC: boolean,
  ): Promise<RegisterOutputPortDto> {
    try {
      // 타사용자 기존 Token Status 변경 (=> USED)
      const otherVaildTokens: Token[] = await this.tokenRepository.find({
        where: [
          {
            identifier: Not(dto.identifier),
            token: dto.token,
            status: TokenStatus.ISSUED,
          },
          {
            identifier: Not(dto.identifier),
            token: dto.token,
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

      // Insert Or Update
      const token: Token = new Token();
      token.identifier = dto.identifier;
      token.token = dto.token;
      token.platform = getPlatformEnum(dto.platform);
      token.status = TokenStatus.VAILD;

      const findToken = await this.tokenRepository.findOne({
        where: [
          {
            identifier: dto.identifier,
            token: dto.token,
          },
        ],
      });

      if (findToken == null) {
        // Insert
        await this.tokenRepository.insert(token);
      } else {
        // Update
        token.updateAt = new Date();
        await this.tokenRepository.update(findToken.id, token);
      }

      const result = await this.tokenRepository.findOneOrFail({
        where: {
          identifier: token.identifier,
          token: token.token,
        },
      });

      // await this.tokenRepository
      //   .createQueryBuilder()
      //   .insert()
      //   .into(Token)
      //   .values([token])
      //   .orUpdate(['token', 'updateAt'], ['token'])
      //   .execute();

      return {
        identifier: result.identifier,
        token: result.token,
        platform: result.platform,
        status: getTokenStatusEnum(result.status),
      } as RegisterOutputPortDto;
    } catch (error) {
      console.error('Error register token:', error);
      throw toException(
        new DatabaseTokenRegisterException(error.detail),
        isRPC,
      );
    }
  }

  async unregister(
    dto: UnregisterInputPortDto,
    isRPC: boolean,
  ): Promise<UnregisterOutputPortDto[]> {
    try {
      const tokens: Token[] = await this.tokenRepository.findBy({
        identifier: dto.identifier,
        token: dto.token,
      });

      const resultTokens: Token[] = [];
      for (const token of tokens) {
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
        resultTokens.push(result);
      }

      return resultTokens.map((resultToken) => {
        const outputDto = new UnregisterOutputPortDto();
        outputDto.identifier = resultToken.identifier;
        outputDto.token = resultToken.token;
        outputDto.platform = resultToken.platform;
        outputDto.status = resultToken.status;
        return outputDto;
      });
    } catch (error) {
      console.error('Error unregister token:', error);
      throw toException(
        new DatabaseTokenUnregisterException(error.detail),
        isRPC,
      );
    }
  }

  async findTokenAll(
    dto: FindTokenInputPortDto,
    isRPC: boolean,
  ): Promise<FindTokenOutputPortDto[]> {
    try {
      const tokens: Token[] = await this.tokenRepository.findBy({
        identifier: dto.identifier,
      });

      return tokens.map((token) => {
        const dto = new FindTokenOutputPortDto();
        dto.identifier = token.identifier;
        dto.token = token.token;
        dto.platform = getPlatformEnum(token.platform);
        dto.status = getTokenStatusEnum(token.status);
        return dto;
      });
    } catch (error) {
      console.error('Error findTokenAll:', error);
      throw toException(
        new DatabaseTokenNotFoundException(error.detail),
        isRPC,
      );
    }
  }

  async sendMessage(
    dto: SendMessageInputPortDto,
    isRPC: boolean,
  ): Promise<SendMessageOutputPortDto[]> {
    try {
      // Data Object to String
      let messageData: string;
      try {
        messageData = getMessageDataFrom(dto);
      } catch (error) {
        throw new InvalidJSONException(error);
      }

      // identifier와 token으로 유효한 Token 리스트 가져오기.
      const tokens: Token[] = await this.getVaildTokensFrom(dto);

      // Firebase 처리
      const messageLogs = await this.firebaseService.processSendMessage(
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

      // Result
      return messageLogs.map((messageLog) => {
        const identifier = messageLog.identifier;
        const token = messageLog.token;
        const state = messageLog.state;

        const outputDto = new SendMessageOutputPortDto();
        outputDto.identifier = identifier;
        outputDto.token = token;
        outputDto.messageStatus = state;

        return outputDto;
      });
    } catch (error) {
      console.error('Error sendMessage:', error);
      throw toException(error, isRPC);
    }
  }

  private async getVaildTokensFrom(
    dto: SendMessageInputPortDto,
  ): Promise<Token[]> {
    // identifier와 token으로 유효한 Token 리스트 가져오기.
    const identifier = dto.identifier;
    const token = dto.token;
    const tokens: Token[] = await this.tokenRepository.find({
      where: [
        {
          identifier: identifier,
          token: token,
          status: TokenStatus.ISSUED,
        },
        {
          identifier: identifier,
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
}
