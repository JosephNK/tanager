import { Test, TestingModule } from '@nestjs/testing';
import { InboundController } from './inbound.controller';
import { InboundService } from './inbound.service';

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
    it('should return "Hello World!"', () => {
      expect(inboundController.getHello()).toBe('Hello World!');
    });
  });
});
