import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AudienceRepository } from './audience.repository';
import { ExpedientRepository } from './expedient.repository';
import { TranscriptionAudienceRepository } from './transcription-audicence.repository';
import { RoleRepository } from './role.repository';
import { TypeRepository } from './type.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            AudienceRepository,
            ExpedientRepository,
            TranscriptionAudienceRepository,
            RoleRepository,
            TypeRepository
        ])
    ]
})
export class RepositoryModule {}
