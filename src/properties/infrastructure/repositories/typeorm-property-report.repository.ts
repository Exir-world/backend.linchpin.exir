import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyReportRepository } from 'src/properties/application/repositories/property-report.repository';
import { Repository } from 'typeorm';
import { PropertyReportEntity } from '../entities/property-report.entity';
import { PropertyReportStatusEnum } from 'src/properties/domain/enums/property-report-status.enum';

@Injectable()
export class TypeOrmPropertyReportRepository implements PropertyReportRepository {
    constructor(
        @InjectRepository(PropertyReportEntity)
        private readonly repo: Repository<PropertyReportEntity>,
    ) { }

    async create(entity: PropertyReportEntity): Promise<PropertyReportEntity> {
        return this.repo.save(entity);
    }

    async findAll(): Promise<PropertyReportEntity[]> {
        return this.repo.find();
    }

    async findByPropertyId(propertyId: number): Promise<PropertyReportEntity[]> {
        return this.repo.find({ where: { propertyId } });
    }

    async findById(reportId: number): Promise<PropertyReportEntity> {
        return this.repo.findOne({ where: { id: reportId } });
    }

    async updateStatusById(reportId: number, status: PropertyReportStatusEnum): Promise<PropertyReportEntity> {
        const report = await this.repo.findOne({ where: { id: reportId } });
        if (!report) {
            throw new NotFoundException('Property report not found');
        }
        report.status = status;
        return this.repo.save(report);
    }
}
