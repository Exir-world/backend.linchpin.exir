import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveEntity } from '../entities/leave.entity';
import { Leave } from '../../domain/leave';
import { LeaveRepository } from '../../application/ports/leave.repository';
import { LeaveMapper } from './../mappers/leave.mapper';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';

@Injectable()
export class LeaveRepositoryImpl implements LeaveRepository {
    constructor(
        @InjectRepository(LeaveEntity)
        private readonly leaveRepository: Repository<LeaveEntity>,
    ) { }

    getUserHourlyLeaveRequests(userId: number, startDate: string, endDate: string): Promise<Leave[]> {
        return this.leaveRepository.find({
            where: {
                userId,
                startTime: Between(new Date(startDate), new Date(endDate)),
                type: LeaveTypeEnum.HOURLY,
            },
        }).then(entities => entities.map(LeaveMapper.toDomain));
    }

    async createLeaveRequest(leave: Leave): Promise<Leave> {
        const entity = LeaveMapper.toEntity(leave);
        const savedEntity = await this.leaveRepository.save(entity);
        return LeaveMapper.toDomain(savedEntity);
    }

    async getUserLeaveRequests(userId: number): Promise<Leave[]> {
        const entities = await this.leaveRepository.find({ where: { userId } });
        return entities.map(LeaveMapper.toDomain);
    }
}
