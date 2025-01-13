import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';

@Entity('stops')
export class StopEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AttendanceEntity, (attendance) => attendance.stops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attendance_id' })
    attendance: AttendanceEntity;

    @Column({ nullable: true })
    reason?: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'start_time' })
    startTime: Date;

    @Column({ type: 'timestamptz', name: 'end_time', nullable: true })
    endTime?: Date;
}
