import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';

@Entity('work_report')
export class WorkReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AttendanceEntity, (attendance) => attendance.workReport, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'attendance_id' }) // Explicitly add a foreign key column
    attendance: AttendanceEntity;

    @Column({ type: 'text', nullable: true })
    workReport: string; // متن گزارش کار

    @Column({ type: 'boolean', default: false })
    accepted: boolean; // تأیید توسط سوپروایزر

    @Column({ type: 'text', nullable: true })
    comment: string; // نظر سوپروایزر

    @Column({ nullable: true })
    acceptedBy: number;
}
