import { Repository, EntityRepository } from 'typeorm';
import { Expedient } from '../entities/expedient.entity';

@EntityRepository(Expedient)
export class ExpedientRepository extends Repository<Expedient> {}