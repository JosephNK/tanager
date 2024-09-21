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
} from '@app/commons';
import { Token } from './entity/token.entity';
import {
  DatabaseTokenRegisterException,
  DatabaseTokenUnregisterException,
  toException,
} from '@app/exceptions';

@Injectable()
export class OutboundService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
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
}
