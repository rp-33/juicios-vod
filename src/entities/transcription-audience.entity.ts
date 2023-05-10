import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Audience } from './audience.entity';
import { User } from './user.entity';

  
@Entity('transcription_audience')
export class TranscriptionAudience extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'json', nullable: false })
    transcription: string; 

    @OneToOne(() => Audience,{ nullable: false }) 
    @JoinColumn({ name: 'audience_id' }) 
    audience: Audience;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated?: Date;

    @ManyToOne(() => User, user => user.transcription,{nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;
    
}