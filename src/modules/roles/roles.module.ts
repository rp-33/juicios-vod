import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from 'src/repositories/role.repository';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      RoleRepository
    ])
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
