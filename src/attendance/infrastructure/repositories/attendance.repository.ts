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

    async filterByUserAndRange(userId: number, startTime: Date, endTime: Date) {

        const attendances = await this.attendanceRepo.find({
            where: {
                userId,
                checkIn: Between(
                    startTime,
                    endTime
                )
            },
            relations: [
                'stops'
            ],
            order: {
                checkIn: 'DESC',
            }
        });

        return attendances;
    }

    async findLastForCheckoutByUser(userId: number): Promise<Attendance | null> {
        const entity = await this.attendanceRepo.findOne({ where: { userId, checkOut: IsNull() }, order: { checkIn: 'DESC' } });
        return entity ? AttendanceMapper.toDomain(entity) : null;
    }
}
