import { Injectable } from '@nestjs/common';
import {
  FindTokenInputPortDto,
  FindTokenOutputPortDto,
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
    return await this.inOutStream<RegisterInputPortDto, RegisterOutputPortDto>(
      'register',
      dto,
    );
  }

  async unregister(
    dto: UnregisterInputPortDto,
  ): Promise<UnregisterOutputPortDto[]> {
    return await this.inOutStream<
      UnregisterInputPortDto,
      UnregisterOutputPortDto[]
    >('unregister', dto);
  }

  async findTokenAll(
    dto: FindTokenInputPortDto,
  ): Promise<FindTokenOutputPortDto[]> {
    return await this.inOutStream<
      FindTokenInputPortDto,
      FindTokenOutputPortDto[]
    >('findTokenAll', dto);
  }

  async sendMessage(
    dto: SendMessageInputPortDto,
  ): Promise<SendMessageOutputPortDto[]> {
    return await this.inOutStream<
      SendMessageInputPortDto,
      SendMessageOutputPortDto[]
    >('sendMessage', dto);
  }

  private async inOutStream<T, P>(cmd: string, dto: T): Promise<P> {
    await lastValueFrom(
      this.inboundClient
        .send<P>({ cmd: cmd }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
    return await lastValueFrom(
      this.outboundClient
        .send<P>({ cmd: cmd }, dto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
