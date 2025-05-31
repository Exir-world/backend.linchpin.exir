import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserCheckPointEntity } from './user-check-point.entity';

@Entity('user_check_point_attachments')
export class UserCheckPointAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    fileType: string;

    @Column()
    fileUrl: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserCheckPointEntity, (ucp) => ucp.attachments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userCheckPointId' })
    userCheckPoint: UserCheckPointEntity;

    @Column()
    userCheckPointId: number;
}
