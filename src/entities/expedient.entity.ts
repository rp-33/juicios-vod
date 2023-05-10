import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Audience } from './audience.entity';
import { User } from './user.entity';
import { Type } from './type.entity';
  
@Entity('expedients')
export class Expedient extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    title: string; 

    @Column({ type: 'varchar', length: 50, nullable: false, unique : true })
    code: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => Audience, audience => audience.expedient,{nullable: false})
    audience: Audience[];

    @ManyToOne(() => User, user => user.expedient,{nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Type, type => type.expedient,{nullable : false})
    @JoinColumn({name: 'type_id'})
    type: Type;

}