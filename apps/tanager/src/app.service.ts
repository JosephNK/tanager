import { Injectable } from '@nestjs/common';
import { RegisterInputPortDto, RegisterOutputPortDto } from '@app/commons';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
  RpcException,
} from '@nestjs/microservices';
import {
  IdentifierNotFoundException,
  TokenNotFoundException,
} from '@app/exceptions';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    console.log('constructor');
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8877,
      },
    });
  }

  async register(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    try {
      return await lastValueFrom(
        this.client.send<RegisterOutputPortDto>({ cmd: 'register' }, dto),
      );
    } catch (error) {
      console.log('aaa');
      console.log('error', error);
      const response = error.response;
      switch (response) {
        case new IdentifierNotFoundException().errorCode:
          console.log('bbb');
          break;
        case new TokenNotFoundException().errorCode:
          console.log('ccc');
          break;
      }
      throw new RpcException(error.response);
    }
  }
}
