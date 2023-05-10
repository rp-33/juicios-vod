import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudienceController } from './audience.controller';
import { AudienceService } from './audience.service';
import { AudienceRepository } from '../../repositories/audience.repository';
import { StorageService } from '../storage/storage.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      AudienceRepository
    ])
  ],
  controllers: [AudienceController],
  providers: [AudienceService,StorageService]
})
export class AudienceModule {}
