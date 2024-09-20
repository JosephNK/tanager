import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SendMessageInputPortDto } from '@app/commons';
import * as admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { UserNotFoundException } from '@app/exceptions';

/// Service
@Injectable()
export class InboundFirebaseService {
  async sendMessage(dto: SendMessageInputPortDto): Promise<string> {
    try {
      const filePath = `../${process.env.FIREBASE_SERVICE_KEY_FILE}`;
      const data = await readFile(filePath, 'utf8');
      console.log(data);
      return `Hello World!! ${data}`;
    } catch (error) {
      throw new UserNotFoundException();
    }
    return `Hello World!! ${process.env.FIREBASE_SERVICE_KEY_PATH}`;
    return `Hello World! ${dto.token}`;
  }
}
