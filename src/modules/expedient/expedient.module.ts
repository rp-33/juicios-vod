import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientRepository } from 'src/repositories/expedient.repository';
import { ExpedientController } from './expedient.controller';
import { ExpedientService } from './expedient.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      ExpedientRepository
    ])
  ],
  controllers: [ExpedientController],
  providers: [ExpedientService]
})
export class ExpedientModule {}
