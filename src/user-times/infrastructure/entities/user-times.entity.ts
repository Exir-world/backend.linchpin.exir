import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { WeeklyTimesEntity } from './weekly-times.entity';

@Entity('user_times')
export class UserTimesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => WeeklyTimesEntity, (weekly) => weekly.userTimes, { cascade: true })
    weeklyTimes: WeeklyTimesEntity[];
}
