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
  FirebaseSendMessageOutputPortDto,
} from '@app/commons';
import { Token } from './entity/token.entity';
import {
  DatabaseTokenNotFoundException,
  DatabaseTokenRegisterException,
  DatabaseTokenUnregisterException,
  FirebaseMessageSendException,
  toException,
} from '@app/exceptions';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class OutboundService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
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
  ): Promise<UnregisterOutputPortDto> {
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

      return resultTokens as UnregisterOutputPortDto;
    } catch (error) {
      console.error('Error unregister token:', error);
      throw toException(
        new DatabaseTokenUnregisterException(error.detail),
        isRPC,
      );
    }
  }

  findTokenAll(dto: FindTokenInputPortDto): string {
    return `Hello World! ${dto.identifier}`;
  }

  async sendMessage(
    dto: SendMessageInputPortDto,
    isRPC: boolean,
  ): Promise<SendMessageOutputPortDto> {
    try {
      const tokens: Token[] = await this.tokenRepository.find({
        where: [
          {
            identifier: dto.identifier,
            token: dto.token,
            status: TokenStatus.ISSUED,
          },
          {
            identifier: dto.identifier,
            token: dto.token,
            status: TokenStatus.VAILD,
          },
        ],
      });

      if (tokens.length == 0) {
        throw new DatabaseTokenNotFoundException();
      }

      const messageResults: FirebaseSendMessageOutputPortDto[] = [];
      for (const token of tokens) {
        const result = await this.firebaseService.sendMessage({
          token: token.token,
          title: dto.token,
          message: dto.message,
        });
        messageResults.push(result);
      }

      const errorMessages: string[] = [];
      for (const messageResult of messageResults) {
        const token = messageResult.token;
        const response = messageResult.response;
        const errorCode = messageResult.errorCode;
        console.log('errorCode', errorCode);

        if (errorCode) {
          const errorMessage = `token: ${token}, errorCode: ${errorCode}`;
          errorMessages.push(errorMessage);
        }
      }

      if (errorMessages.length > 0) {
        const message = errorMessages.join('/n');
        throw new FirebaseMessageSendException(message);
      }

      return [];
    } catch (error) {
      console.error('Error unregister token:', error);
      throw toException(error, isRPC);
    }
  }
}
