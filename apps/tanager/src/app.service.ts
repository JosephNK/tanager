import { Injectable } from '@nestjs/common';
import {
  RegisterInputPortDto,
  RegisterOutputPortDto,
  SendMessageInputPortDto,
  SendMessageOutputPortDto,
  UnregisterInputPortDto,
  UnregisterOutputPortDto,
} from '@app/commons';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
  RpcException,
} from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable()
export class AppService {
  private inboundClient: ClientProxy;
  private outboundClient: ClientProxy;

  constructor() {
    this.inboundClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: parseInt(process.env.MICROSERVICE_INBOUND_PORT),
      },
    });
    this.outboundClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: parseInt(process.env.MICROSERVICE_OUTBOUND_PORT),
      },
    });
  }

  async register(dto: RegisterInputPortDto): Promise<RegisterOutputPortDto> {
    await lastValueFrom(
      this.inboundClient
        .send<RegisterOutputPortDto>({ cmd: 'register' }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
    return await lastValueFrom(
      this.outboundClient
        .send<RegisterOutputPortDto>({ cmd: 'register' }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async unregister(
    dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto> {
    await lastValueFrom(
      this.inboundClient
        .send<UnregisterOutputPortDto>({ cmd: 'unregister' }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
    return await lastValueFrom(
      this.outboundClient
        .send<UnregisterOutputPortDto>({ cmd: 'unregister' }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async sendMessage(
    dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto> {
    await lastValueFrom(
      this.inboundClient
        .send<SendMessageOutputPortDto>({ cmd: 'sendMessage' }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
    return await lastValueFrom(
      this.outboundClient
        .send<SendMessageOutputPortDto>({ cmd: 'sendMessage' }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
