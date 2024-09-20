import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  InboundRegisterInputPortDto,
  InboundUnregisterInputPortDto,
  InboundSendMessageInputPortDto,
  InboundFindTokenInputPortDto,
} from './inbound.input.port';
import * as admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { UserNotFoundException } from '@app/exceptions';

/// Service
@Injectable()
export class InboundFirebaseService {
  async sendMessage(dto: InboundSendMessageInputPortDto): Promise<string> {
    try {
      let filePath = `../${process.env.FIREBASE_SERVICE_KEY_FILE}`;
      let data = await readFile(filePath, 'utf8');
      console.log(data);
      return `Hello World!! ${data}`;
    } catch (error) {
      throw new UserNotFoundException();
    }
    return `Hello World!! ${process.env.FIREBASE_SERVICE_KEY_PATH}`;
    return `Hello World! ${dto.token}`;
  }
}
