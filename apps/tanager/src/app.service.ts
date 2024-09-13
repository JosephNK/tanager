import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 4000,
      },
    });
  }

  getHello(): string {
    return `Hello World! ${process.env.NODE_ENV}`;
  }

  getHello1(): Observable<string> {
    // return this.client.send<string, string>('getHello1', 'Michael').toPromise();
    console.log('asdas')
    return this.client.send<string, string>('getHello1', 'Michael');
  }

  // getHello1() {
  //   // return this.client.send<string, string>('getHello1', 'Michael').toPromise();
  //   console.log('asdas')
  //   return this.client.emit('getHello1', 'Michael')
  // }
}
