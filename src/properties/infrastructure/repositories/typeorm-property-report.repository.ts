import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyReportRepository } from 'src/properties/application/repositories/property-report.repository';
import { Repository } from 'typeorm';
import { PropertyReportEntity } from '../entities/property-report.entity';

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
}
