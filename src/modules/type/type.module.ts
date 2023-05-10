import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeRepository } from 'src/repositories/type.repository';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      TypeRepository
    ])
  ],
  controllers: [TypeController],
  providers: [TypeService]
})
export class TypeModule {}
