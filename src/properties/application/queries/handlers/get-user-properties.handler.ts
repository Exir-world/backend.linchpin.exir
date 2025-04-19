
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserPropertiesQuery } from '../get-user-properties.query';
import { UserPropertyRepository } from '../../repositories/user-property.repository';
import { PropertyReportRepository } from '../../repositories/property-report.repository';

@QueryHandler(GetUserPropertiesQuery)
export class GetUserPropertiesHandler implements IQueryHandler<GetUserPropertiesQuery> {
    constructor(
        @Inject('UserPropertyRepository') private readonly repository: UserPropertyRepository,
        @Inject('PropertyReportRepository') private readonly reportRepository: PropertyReportRepository,
    ) { }

    async execute(query: GetUserPropertiesQuery) {
        const userProperties = await this.repository.findByUserId(query.userId);
        const reports = await this.reportRepository.findNotGoodsByUserId(query.userId);

        return userProperties.map(property => ({
            ...property,
            hasAlreadyReported: reports.some(report => report.propertyId === property.propertyId),
        }))
    }
}
