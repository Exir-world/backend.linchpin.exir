import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_sessions')
export class UserSessionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 500 })
    refreshToken: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    user: UserEntity;
}
