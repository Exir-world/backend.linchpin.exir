import { PropertyReport } from 'src/properties/domain/property-report.domain';
import { PropertyReportEntity } from '../entities/property-report.entity';

export const PropertyReportMapper = {
    toDomain(entity: PropertyReportEntity): PropertyReport {
        return new PropertyReport(
            entity.id,
            entity.userId,
            entity.propertyId,
            entity.property,
            entity.report,
            entity.status,
            entity.createdAt,
        );
    },

    toEntity(domain: PropertyReport): PropertyReportEntity {
        const entity = new PropertyReportEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.propertyId = domain.propertyId;
        entity.property = domain.property;
        entity.report = domain.report;
        entity.status = domain.status;
        entity.createdAt = domain.createdAt;
        return entity;
    },

    toDomainList(entities: PropertyReportEntity[]): PropertyReport[] {
        return entities.map(entity => this.toDomain(entity));
    },

    toEntityList(domains: PropertyReport[]): PropertyReportEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
};
