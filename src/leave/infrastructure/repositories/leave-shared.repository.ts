import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveEntity } from '../entities/leave.entity';
import { LeaveSharedRepository } from 'src/leave/application/ports/leave-shared.repository';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';
import { LeaveMapper } from '../mappers/leave.mapper';
import { Leave } from 'src/leave/domain/leave';

@Injectable()
export class LeaveSharedRepositoryImpl implements LeaveSharedRepository {
    constructor(
        @InjectRepository(LeaveEntity)
        private readonly leaveRepository: Repository<LeaveEntity>,
    ) { }

    async createLeave(
        userId: number,
        type: string,
        startTime: Date,
        endTime: Date,
        description: string
    ): Promise<void> {
        await this.leaveRepository.save({
            userId,
            type: (type as LeaveTypeEnum),
            startTime,
            endTime,
            description,
        });
    }

    async filterByUserAndRange(
        userId: number,
        startDate: Date,
        endDate: Date
    ): Promise<Leave[]> {
        const entities = await this.leaveRepository.find({
            where: {
                userId,
                startTime: Between(startDate, endDate),
            },
            order: { startTime: 'ASC' },
        });
        return entities.map(LeaveMapper.toDomain);
    }
}
