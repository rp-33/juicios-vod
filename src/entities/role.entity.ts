import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm';
import { User } from './user.entity';
  
@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 10, nullable: false })
    name: string; 

    @OneToMany(() => User, user => user.rol,{nullable: false})
    user: User[];

}