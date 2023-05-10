import { Test, TestingModule } from '@nestjs/testing';
import { ExpedientController } from './expedient.controller';

describe('ExpedientController', () => {
  let controller: ExpedientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpedientController],
    }).compile();

    controller = module.get<ExpedientController>(ExpedientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
