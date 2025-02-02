import { BadRequestException, Injectable } from '@nestjs/common';
import { AttendanceEntity } from '../entities/attendance.entity';
import { Between, In, IsNull, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceSharedRepository } from 'src/attendance/application/ports/attendance-shared.repository';
import { Attendance } from 'src/attendance/domain/attendance';
import { AttendanceMapper } from '../mappers/attendance.mapper';

@Injectable()
export class AttendanceSharedRepositoryImpl implements AttendanceSharedRepository {
    constructor(
        @InjectRepository(AttendanceEntity)
        private readonly attendanceRepo: Repository<AttendanceEntity>,
    ) { }

    async manualCheckIn(userId: number, time: Date): Promise<void> {
        await this.attendanceRepo.save({
            userId,
            checkIn: time
        });
    }

    async manualCheckOut(userId: number, time: Date): Promise<void> {
        const lastAttendance = await this.attendanceRepo.findOne({
            where: { userId, checkIn: LessThan(time), checkOut: IsNull() },
            order: { checkIn: 'DESC' },
        });

        if (!lastAttendance)
            throw new BadRequestException('There is no check in time for entered time!');

        lastAttendance.checkOut = time;

        await this.attendanceRepo.save(lastAttendance);
    }

    async findByUserIds(ids: number[], start: Date, end: Date): Promise<any> {
        const entity = await this.attendanceRepo.find({
            where: { userId: In(ids), checkIn: Between(start, end) },
            relations: ['stops'],
            order: { checkIn: 'ASC' },
        });

        const users = AttendanceMapper.toDomainList(entity)

        const grouped = users.reduce((acc, record) => {
            let userGroup = acc.find(g => g.userId === record.userId);
            if (!userGroup) {
                userGroup = { userId: record.userId, attendances: [] };
                acc.push(userGroup);
            }
            userGroup.attendances.push(record);
            return acc;
        }, []);

        return grouped;
    }
}
