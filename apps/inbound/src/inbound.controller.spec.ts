import { Test, TestingModule } from '@nestjs/testing';
import { InboundController } from './inbound.controller';
import { InboundService } from './inbound.service';
import {
  MessageStatus,
  OptionalDto,
  Platform,
  Provider,
  RegisterInPortDto,
  RegisterOutPortDto,
  SendMessageInPortDto,
  SendMessageOutPortDto,
  TokenInPortDto,
  TokenOutPortDto,
  TokenStatus,
  UnregisterInPortDto,
  UnregisterOutPortDto,
} from '@app/models';

describe('InboundController', () => {
  let inboundController: InboundController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InboundController],
      providers: [InboundService],
    }).compile();

    inboundController = app.get<InboundController>(InboundController);
  });

  describe('root', () => {
    // ref., https://www.tomray.dev/nestjs-unit-testing

    it('should return "Hello World!"', () => {
      expect(inboundController.getHello()).toBe('Hello World!');
    });

    it('register is should return "Same Result"', async () => {
      const receiver = ['jack@gmail.com'];
      const sender = undefined;
      const provider = Provider.FIREBASE;
      const optional = new OptionalDto('d5ajwj');
      const platform = undefined;

      const inPortDto = new RegisterInPortDto();
      inPortDto.receiver = receiver;
      inPortDto.sender = sender;
      inPortDto.provider = provider;
      inPortDto.optional = optional;
      inPortDto.platform = platform;

      const outPortDto = new RegisterOutPortDto();
      outPortDto.receiver = receiver;
      outPortDto.sender = sender;
      outPortDto.provider = provider;
      outPortDto.optional = optional;
      outPortDto.platform = platform;

      const result = inboundController.register(inPortDto);

      await expect(result).resolves.toStrictEqual(outPortDto);
    });

    it('unregister is should return "Same Result"', async () => {
      const receiver = ['jack@gmail.com'];
      const provider = Provider.FIREBASE;
      const optional = new OptionalDto('d5ajwj');

      const inPortDto = new UnregisterInPortDto();
      inPortDto.receiver = receiver;
      inPortDto.provider = provider;
      inPortDto.optional = optional;

      const outPortDto = new UnregisterOutPortDto();
      outPortDto.receiver = receiver;
      outPortDto.provider = provider;
      outPortDto.optional = optional;

      const result = inboundController.unregister(inPortDto);

      await expect(result).resolves.toStrictEqual(outPortDto);
    });

    it('sendMessage is should return "Same Result"', async () => {
      const receiver = ['jackDaniel'];
      const provider = Provider.FIREBASE;
      const optional = new OptionalDto('d5ajwj', undefined, 'This is Message');

      const inPortDto = new SendMessageInPortDto();
      inPortDto.receiver = receiver;
      inPortDto.provider = provider;
      inPortDto.optional = optional;

      const outPortDto = new SendMessageOutPortDto();
      outPortDto.receiver = receiver;
      outPortDto.provider = provider;
      outPortDto.optional = optional;
      outPortDto.messageStatus = MessageStatus.PENDING;

      const result = inboundController.sendMessage(inPortDto);

      await expect(result).resolves.toStrictEqual(outPortDto);
    });

    it('findTokenAll is should return "Same Result"', async () => {
      const receiver = ['jackDaniel'];

      const inPortDto = new TokenInPortDto();
      inPortDto.receiver = receiver;

      const outPortDto = new TokenOutPortDto();
      outPortDto.receiver = receiver;
      outPortDto.optional = null;
      outPortDto.platform = Platform.NONE;
      outPortDto.tokenStatus = TokenStatus.PENDING;

      const result = inboundController.findTokenAll(inPortDto);

      await expect(result).resolves.toStrictEqual(outPortDto);
    });

    it('sendMessage is should return "Same Result"', async () => {
      const receiver = ['jackDaniel'];
      const provider = Provider.FIREBASE;

      const optional = new OptionalDto();
      optional.message = 'Hello World';

      const inPortDto = new SendMessageInPortDto();
      inPortDto.receiver = receiver;
      inPortDto.sender = null;
      inPortDto.provider = provider;
      inPortDto.optional = optional;

      const outPortDto = new SendMessageOutPortDto();
      outPortDto.receiver = receiver;
      outPortDto.provider = provider;
      outPortDto.optional = optional;
      outPortDto.messageStatus = MessageStatus.PENDING;

      const result = inboundController.sendMessage(inPortDto);

      await expect(result).resolves.toStrictEqual(outPortDto);
    });
  });
});
