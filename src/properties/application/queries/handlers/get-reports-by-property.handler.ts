import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReportsByPropertyQuery } from '../get-reports-by-property.query';
import { PropertyReportRepository } from '../../repositories/property-report.repository';

@QueryHandler(GetReportsByPropertyQuery)
export class GetReportsByPropertyHandler implements IQueryHandler<GetReportsByPropertyQuery> {
    constructor(
        @Inject('PropertyReportRepository') private readonly repository: PropertyReportRepository,
    ) { }

    async execute(query: GetReportsByPropertyQuery) {
        return this.repository.findByPropertyId(query.propertyId);
    }
}
