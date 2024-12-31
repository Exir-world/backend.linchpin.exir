import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveEntity } from '../entities/leave.entity';
import { LeaveSharedRepository } from 'src/leave/application/ports/leave-shared.repository';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';

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
}
