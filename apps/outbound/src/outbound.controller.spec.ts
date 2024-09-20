import { Test, TestingModule } from '@nestjs/testing';
import { OutboundController } from './outbound.controller';
import { OutboundService } from './outbound.service';

describe('OutboundController', () => {
  let outboundController: OutboundController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OutboundController],
      providers: [OutboundService],
    }).compile();

    outboundController = app.get<OutboundController>(OutboundController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(outboundController.getHello()).toBe('Hello World!');
    });
  });
});
