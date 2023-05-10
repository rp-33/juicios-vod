import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Role } from './role.entity';
import { Expedient } from './expedient.entity';
import { Audience } from './audience.entity';
import { TranscriptionAudience } from './transcription-audience.entity';
  
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string; 

    @Column({ type: 'varchar', length: 25, nullable: false })
    last_name: string;
  
    @Column({ type: 'varchar',unique: true, nullable: false })
    email: string;

    @Column({ type: 'numeric', nullable: false })
    curp: number;
  
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'smallint',default : 0, nullable: false })
    status: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at',nullable: false })
    createdAt: Date;

    @ManyToOne(() => Role, rol => rol.user,{nullable : false})
    @JoinColumn({name: 'rol_id'})
    rol: Role;

    @OneToMany(() => Expedient, expedient => expedient.user,{nullable: false})
    expedient: Expedient[];

    @OneToMany(() => Audience, audience => audience.user,{nullable: false})
    audience: Audience[];

    @OneToMany(() => TranscriptionAudience, transcription => transcription.user,{nullable: false})
    transcription : TranscriptionAudience[];

}