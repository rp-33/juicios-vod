import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptionAudienceController } from './transcription-audience.controller';

describe('TranscriptionAudienceController', () => {
  let controller: TranscriptionAudienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranscriptionAudienceController],
    }).compile();

    controller = module.get<TranscriptionAudienceController>(TranscriptionAudienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
