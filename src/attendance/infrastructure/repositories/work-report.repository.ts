import { Injectable } from '@nestjs/common';
import { WorkReportRepository } from '../../application/ports/work-report.repository';
import { WorkReportEntity } from '../entities/work-report.entity';
import { WorkReportMapper } from '../mappers/work-report.mapper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkReport } from 'src/attendance/domain/work-report';

@Injectable()
export class WorkReportRepositoryImpl implements WorkReportRepository {
    constructor(
        @InjectRepository(WorkReportEntity)
        private readonly workReportRepo: Repository<WorkReportEntity>,
    ) { }

    async save(workReport: WorkReport): Promise<void> {
        const entity = WorkReportMapper.toEntity(workReport);
        await this.workReportRepo.save(entity);
    }

    async findById(id: number): Promise<WorkReport | null> {
        const entity = await this.workReportRepo.findOne({ where: { id }, relations: ['attendance'] });
        return entity ? WorkReportMapper.toDomain(entity) : null;
    }
}
