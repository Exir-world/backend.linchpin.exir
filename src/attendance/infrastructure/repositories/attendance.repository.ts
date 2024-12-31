import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from '../../application/ports/attendance.repository';
import { AttendanceEntity } from '../entities/attendance.entity';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { Between, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/attendance/domain/attendance';
import { DateUtil } from 'src/common/utils/date.util';

@Injectable()
export class AttendanceRepositoryImpl implements AttendanceRepository {
    constructor(
        @InjectRepository(AttendanceEntity)
        private readonly attendanceRepo: Repository<AttendanceEntity>,
    ) { }

    async findTodayAttendance(userId: number): Promise<Attendance[]> {
        const startOfToday = DateUtil.startOfDay();
        const endOfToday = DateUtil.endOfDay();

        const todayAttendances = await this.attendanceRepo.find({
            where: {
                userId,
                checkIn: Between(startOfToday, endOfToday)
            },
            relations: ['stops'],
            order: {
                checkIn: 'ASC'
            }
        });

        return AttendanceMapper.toDomainList(todayAttendances);
    }

    async save(attendance: Attendance): Promise<void> {
        const entity = AttendanceMapper.toEntity(attendance);
        await this.attendanceRepo.save(entity);
    }

    async findById(id: number): Promise<Attendance | null> {
        const entity = await this.attendanceRepo.findOne({ where: { id }, relations: ['stops'] });
        return entity ? AttendanceMapper.toDomain(entity) : null;
    }

    async findLastByUserId(userId: number): Promise<Attendance | null> {
        const entity = await this.attendanceRepo.findOne({
            where: { userId },
            order: { checkIn: 'DESC' },
            relations: ['stops']
        });
        return entity ? AttendanceMapper.toDomain(entity) : null;
    }

    async getMonthlyReports(userId: number, monthAgo: number) {
        const monthHours = 45 * 24;

        const monthStarts = DateUtil.getStartOfPreviousMonths(monthAgo);

        const allRecords = await this.attendanceRepo.find({
            where: {
                userId,
                checkIn: Between(
                    monthStarts[monthStarts.length - 1].startDate.toJSDate(),
                    monthStarts[0].startDate.plus({ months: 1 }).toJSDate()
                )
            },
            relations: [
                'stops'
            ],
            order: {
                checkIn: 'DESC',
            }
        });

        // گروه‌بندی و محاسبه زمان کار
        const groupedWorkMinutes = monthStarts.map((month) => {
            const startOfMonth = month.startDate;
            const endOfMonth = month.startDate.plus({ months: 1 });

            // فیلتر رکوردها برای این ماه
            const monthRecords = allRecords.filter(record => {
                const recordDate = DateUtil.fromJsDate(record.checkIn);
                return recordDate >= startOfMonth && recordDate < endOfMonth;
            });

            // محاسبه مجموع زمان کار
            const workMinutes = monthRecords.reduce((total, record) => {
                const checkIn = DateUtil.fromJsDate(record.checkIn);
                const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;

                // محاسبه زمان حضور (Attendance Duration)
                const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

                // محاسبه زمان توقف (Stops Duration)
                const stopsMinutes = record.stops.reduce((stopTotal, stop) => {
                    const stopStart = DateUtil.fromJsDate(stop.startTime);
                    const stopEnd = stop.endTime ? DateUtil.fromJsDate(stop.endTime) : stopStart;
                    return stopTotal + stopEnd.diff(stopStart, 'minutes').minutes;
                }, 0);

                return total + (attendanceMinutes - stopsMinutes);
            }, 0);

            return {
                month: month.monthNumber,
                workMinutes: workMinutes,
                overTimeMinutes: Math.max(workMinutes - monthHours, 0),
                shortTimeMinutes: Math.max(monthHours - workMinutes, 0),
            };
        });

        return groupedWorkMinutes;
    }

    async findLastForCheckoutByUser(userId: number): Promise<Attendance | null> {
        const entity = await this.attendanceRepo.findOne({ where: { userId, checkOut: IsNull() }, order: { checkIn: 'DESC' } });
        return entity ? AttendanceMapper.toDomain(entity) : null;
    }
}
