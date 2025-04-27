import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllReportsQuery } from '../get-all-reports.query';
import { PropertyReportRepository } from '../../repositories/property-report.repository';

@QueryHandler(GetAllReportsQuery)
export class GetAllReportsHandler implements IQueryHandler<GetAllReportsQuery> {
    constructor(
        @Inject('PropertyReportRepository') private readonly repository: PropertyReportRepository,
    ) { }

    async execute(query: GetAllReportsQuery) {
        const { categoryId, code, status } = query;
        return await this.repository.findAll({
            categoryId,
            code,
            status,
        });
    }
}
