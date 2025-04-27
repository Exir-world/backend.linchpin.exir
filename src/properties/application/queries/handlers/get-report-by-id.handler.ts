import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetReportByIdQuery } from '../get-reports-by-id.query';
import { PropertyReportRepository } from '../../repositories/property-report.repository';

@QueryHandler(GetReportByIdQuery)
export class GetReportByIdHandler implements IQueryHandler<GetReportByIdQuery> {
    constructor(
        @Inject('PropertyReportRepository') private readonly repository: PropertyReportRepository,
    ) { }

    async execute(query: GetReportByIdQuery) {
        const report = await this.repository.findById(query.id);
        if (!report)
            throw new NotFoundException('Report not found!');

        return report;
    }
}
