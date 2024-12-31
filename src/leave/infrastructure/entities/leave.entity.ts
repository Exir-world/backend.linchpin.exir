import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';

@Entity('leave')
export class LeaveEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: LeaveTypeEnum })
    type: LeaveTypeEnum;

    @Column()
    userId: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @CreateDateColumn()
    createdAt: Date;
}
