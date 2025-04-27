import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyReportRepository } from 'src/properties/application/repositories/property-report.repository';
import { Not, Repository } from 'typeorm';
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

    async findAll(filters?: { code?: string; categoryId?: number; status?: PropertyReportStatusEnum }): Promise<PropertyReportEntity[]> {
        const where: any = {};
        if (filters?.code) {
            where.property = where.property || {};
            where.property.code = filters.code;
        }
        if (filters?.categoryId) {
            where.property = where.property || {};
            where.property.category = where.property.category || {};
            where.property.category.id = filters.categoryId;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        return this.repo.find({ where, relations: ['property', 'property.category'] });
    }

    async findByPropertyId(propertyId: number): Promise<PropertyReportEntity[]> {
        return this.repo.find({ where: { propertyId }, relations: ['property'] });
    }

    async findById(reportId: number): Promise<PropertyReportEntity> {
        return this.repo.findOne({ where: { id: reportId }, relations: ['property'] });
    }

    async findNotGoodsByUserId(userId: number): Promise<PropertyReportEntity[]> {
        return this.repo.find({ where: { userId, status: Not(PropertyReportStatusEnum.REPAIRED) }, relations: ['property'] });
    }

    async updateStatusById(reportId: number, status: PropertyReportStatusEnum): Promise<PropertyReportEntity> {
        const report = await this.repo.findOne({ where: { id: reportId }, relations: ['property'] });
        if (!report) {
            throw new NotFoundException('Property report not found');
        }
        report.status = status;
        return this.repo.save(report);
    }
}
