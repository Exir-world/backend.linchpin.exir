import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { WorkReportEntity } from './work-report.entity';
import { StopEntity } from './stop.entity';

@Entity('attendance')
export class AttendanceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number; // شناسه کاربر

    @Column({ type: 'timestamp', nullable: false })
    checkIn: Date; // زمان ورود

    @Column({ type: 'timestamp', nullable: true })
    checkOut: Date; // زمان خروج

    @OneToOne(() => WorkReportEntity, (workReport) => workReport.attendance, { cascade: true })
    workReport: WorkReportEntity; // ارتباط با گزارش کار

    @OneToMany(() => StopEntity, (stop) => stop.attendance, { cascade: true })
    @JoinColumn()
    stops: StopEntity[];
}
