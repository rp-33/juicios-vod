import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { Expedient } from './expedient.entity';
import { User } from './user.entity';
  
@Entity('audiences')
export class Audience extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    title: string; 

    @Column({ type: 'varchar', nullable: false })
    url_cover: string;

    @Column({ type: 'text', nullable: false })
    url_video: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => Expedient, expedient => expedient.audience,{nullable: false})
    @JoinColumn({name: 'expedient_id'})
    expedient: Expedient;

    @ManyToOne(() => User, user => user.audience,{nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => User, user => user.audience,{nullable: true})
    @JoinColumn({name: 'user_assign'})
    user_assign: User

}