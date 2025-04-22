
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserPropertyRepository } from '../../repositories/user-property.repository';
import { PropertyReportRepository } from '../../repositories/property-report.repository';
import { GetUserPropertiesForAdminQuery } from '../get-user-properties-for-admin.query';

@QueryHandler(GetUserPropertiesForAdminQuery)
export class GetUserPropertiesForAdminHandler implements IQueryHandler<GetUserPropertiesForAdminQuery> {
    constructor(
        @Inject('UserPropertyRepository') private readonly repository: UserPropertyRepository,
        @Inject('PropertyReportRepository') private readonly reportRepository: PropertyReportRepository,
    ) { }

    async execute(query: GetUserPropertiesForAdminQuery) {
        const userProperties = await this.repository.findByUserId(query.userId);
        const reports = await this.reportRepository.findNotGoodsByUserId(query.userId);

        return userProperties.map(property => ({
            ...property,
            hasAlreadyReported: reports.some(report => report.propertyId === property.propertyId),
        }))
    }
}
