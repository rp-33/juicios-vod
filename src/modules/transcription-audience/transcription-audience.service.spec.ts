import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptionAudienceService } from './transcription-audience.service';

describe('TranscriptionAudienceService', () => {
  let service: TranscriptionAudienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranscriptionAudienceService],
    }).compile();

    service = module.get<TranscriptionAudienceService>(TranscriptionAudienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
