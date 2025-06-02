import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserTimesEntity } from './user-times.entity';

@Entity('weekly_times')
export class WeeklyTimesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserTimesEntity, (userTimes) => userTimes.weeklyTimes, { onDelete: 'CASCADE' })
    userTimes: UserTimesEntity;

    @Column()
    dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)

    @Column({ type: 'time', nullable: true })
    startTime: string;

    @Column({ type: 'time', nullable: true })
    endTime: string;

    @Column({ default: false })
    isAbsent: boolean;
}
