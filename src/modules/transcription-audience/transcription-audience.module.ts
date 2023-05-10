import { Module } from '@nestjs/common';
import { TranscriptionAudienceController } from './transcription-audience.controller';
import { TranscriptionAudienceService } from './transcription-audience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscriptionAudienceRepository } from 'src/repositories/transcription-audicence.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TranscriptionAudienceRepository
    ])
  ], 
  controllers: [TranscriptionAudienceController],
  providers: [TranscriptionAudienceService]
})
export class TranscriptionAudienceModule {}
