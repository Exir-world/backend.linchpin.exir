import { BadRequestException, Injectable } from '@nestjs/common';
import { AttendanceEntity } from '../entities/attendance.entity';
import { AttendanceMapper } from '../mappers/attendance.mapper';
import { Between, IsNull, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/attendance/domain/attendance';
import { DateUtil } from 'src/common/utils/date.util';
import { AttendanceSharedRepository } from 'src/attendance/application/ports/attendance-shared.repository';

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
}
