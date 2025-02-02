import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from '../../application/ports/attendance.repository';
import { AttendanceEntity } from '../entities/attendance.entity';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { Between, In, IsNull, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/attendance/domain/attendance';
import { DateUtil } from 'src/common/utils/date.util';

@Injectable()
export class AttendanceRepositoryImpl implements AttendanceRepository {
    constructor(
        @InjectRepository(AttendanceEntity)
        private readonly attendanceRepo: Repository<AttendanceEntity>,
    ) { }

    async findCheckedInAttendances(userIds: number[]): Promise<Attendance[]> {
        const attendances = await this.attendanceRepo.find({
            where: {
                userId: In(userIds),
                checkOut: IsNull(),
            },
            relations: ['stops']
        });

        return AttendanceMapper.toDomainList(attendances);
    }

    async findTodayAttendance(userId: number): Promise<Attendance[]> {
        const startOfToday = DateUtil.startOfDay();
        const endOfToday = DateUtil.endOfDay();

        const todayAttendances = await this.attendanceRepo.find({
            where: {
                userId,
                checkIn: Between(startOfToday, endOfToday)
            },
            relations: ['stops', 'workReport'],
            order: {
                checkIn: 'ASC'
            }
        });

        return AttendanceMapper.toDomainList(todayAttendances);
    }

    async save(attendances: Attendance[]): Promise<Attendance[]> {
        const entities = attendances.map(attendance => AttendanceMapper.toEntity(attendance));
        const newEntities = await this.attendanceRepo.save(entities);
        return AttendanceMapper.toDomainList(newEntities);
    }

    async findById(id: number): Promise<Attendance | null> {
        const entity = await this.attendanceRepo.findOne({ where: { id }, relations: ['stops'] });
        return entity ? AttendanceMapper.toDomain(entity) : null;
    }

    async findByUserIds(ids: number[]): Promise<Attendance[]> {
        const entity = await this.attendanceRepo.find({ where: { userId: In(ids) }, relations: ['stops'], order: { checkIn: 'ASC' } });
        return AttendanceMapper.toDomainList(entity);
    }

    async findLastByUserId(userId: number): Promise<Attendance | null> {
        const entity = await this.attendanceRepo.findOne({
            where: { userId },
            order: { checkIn: 'DESC' },
            relations: ['stops', 'workReport']
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
