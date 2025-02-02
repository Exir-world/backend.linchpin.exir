import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StopRepository } from 'src/attendance/application/ports/stop.repository';
import { StopEntity } from '../entities/stop.entity';
import { Stop } from 'src/attendance/domain/stop';
import { StopMapper } from '../mappers/stop.mapper';
import { DateUtil } from 'src/common/utils/date.util';

@Injectable()
export class StopRepositoryImpl implements StopRepository {
    constructor(
        @InjectRepository(StopEntity)
        private readonly stopRepository: Repository<StopEntity>,
    ) { }

    async createStop(attendanceId: number, reason: string): Promise<Stop> {
        const stop = this.stopRepository.create({
            attendance: { id: attendanceId } as any,
            reason,
            startTime: DateUtil.nowUTC(),
        });

        const newStop = await this.stopRepository.save(stop);

        return StopMapper.toDomain(newStop);
    }

    async endStop(userId: number): Promise<Stop> {
        const stop = await this.stopRepository.findOne({
            where: { attendance: { userId } },
            order: { startTime: 'DESC' }
        });

        if (!stop) {
            throw new Error('Stop not found');
        }
        if (stop.endTime) {
            throw new Error('Stop has already ended');
        }
        stop.endTime = DateUtil.nowUTC();

        const updatedStop = await this.stopRepository.save(stop);
        return StopMapper.toDomain(updatedStop);
    }

    async save(stops: Stop[]) {
        const entities = stops.map(stop => StopMapper.toEntity(stop));
        await this.stopRepository.save(entities);
    }
}
