import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
// import { CheckPointEntity } from './check-point.entity';
import { UserCheckPointAttachmentEntity } from './user-check-point-attachment.entity';

@Entity('user_check_points')
export class UserCheckPointEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('decimal', { precision: 10, scale: 6 })
    lat: number;

    @Column('decimal', { precision: 10, scale: 6 })
    lng: number;

    @Column({ default: false })
    report: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    checkPointId: number;

    //   @ManyToOne(() => CheckPointEntity, { onDelete: 'CASCADE' })
    //   @JoinColumn({ name: 'checkPointId' })
    //   checkPoint: CheckPointEntity;

    @OneToMany(() => UserCheckPointAttachmentEntity, (a) => a.userCheckPoint, {
        cascade: true,
    })
    attachments: UserCheckPointAttachmentEntity[];
}
