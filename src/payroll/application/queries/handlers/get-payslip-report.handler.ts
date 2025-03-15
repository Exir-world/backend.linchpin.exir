import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payslip } from 'src/payroll/infrastructure/entities/payslip.entity';
import { Repository } from 'typeorm';
import { GetPayslipReportQuery } from '../get-payslip-report.query';

@QueryHandler(GetPayslipReportQuery)
export class GetPayslipReportHandler implements IQueryHandler<GetPayslipReportQuery> {
    constructor(
        @InjectRepository(Payslip)
        private readonly payslipRepository: Repository<Payslip>,
    ) { }

    async execute(query: GetPayslipReportQuery): Promise<any> {
        const { userId } = query;
        return this.payslipRepository.find({
            where: { userId },
            select: ['id', 'date', 'paymentDate']
        });
    }
}
