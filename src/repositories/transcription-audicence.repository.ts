import { Repository, EntityRepository } from 'typeorm';
import { TranscriptionAudience } from '../entities/transcription-audience.entity';

@EntityRepository(TranscriptionAudience)
export class TranscriptionAudienceRepository extends Repository<TranscriptionAudience> {}