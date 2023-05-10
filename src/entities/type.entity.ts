import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { Expedient } from './expedient.entity';
  
@Entity('types')
export class Type extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique : true })
    name: string; 

    @OneToMany(() => Expedient, expedient => expedient.type,{nullable: false})
    expedient: Expedient[];

}