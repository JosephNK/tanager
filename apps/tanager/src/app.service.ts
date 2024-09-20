import { Injectable } from '@nestjs/common';
import { RegisterInputPortDto } from '@app/commons';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

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

  register(dto: RegisterInputPortDto): Observable<string> {
    console.log('asdas');
    return this.client.send<string>({ cmd: 'register' }, dto);
  }
}
