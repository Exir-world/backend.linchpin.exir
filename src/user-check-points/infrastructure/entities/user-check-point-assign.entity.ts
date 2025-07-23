import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_checkpoint_assign')
export class UserCheckpointAssignEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    checkpointId: number;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;
}