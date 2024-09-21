import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  RegisterInputPortDto,
  UnregisterInputPortDto,
  FindTokenInputPortDto,
  RegisterOutputPortDto,
  getPlatformEnum,
} from '@app/commons';
import { Token } from './entity/token.entity';
import { DatabaseTokenSaveException, toException } from '@app/exceptions';

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
      const platform = getPlatformEnum(dto.platform);

      const token: Token = new Token();
      token.identifier = dto.identifier;
      token.token = dto.token;
      token.platform = platform;

      const result: Token = await this.tokenRepository.save(token);

      return {
        identifier: result.identifier,
        token: result.token,
        platform: result.platform,
      } as RegisterOutputPortDto;
    } catch (error) {
      console.error('Error saving token:', error);
      throw toException(new DatabaseTokenSaveException(error.detail), isRPC);
    }
  }

  unregister(dto: UnregisterInputPortDto): string {
    return `Hello World! ${dto.token}`;
  }

  findTokenAll(dto: FindTokenInputPortDto): string {
    return `Hello World! ${dto.identifier}`;
  }
}
