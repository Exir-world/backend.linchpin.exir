import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Payslip } from 'src/payroll/infrastructure/entities/payslip.entity';
import { Repository } from 'typeorm';
import { GetPayslipByIdQuery } from '../get-payslip-by-id.query';

@QueryHandler(GetPayslipByIdQuery)
export class GetPayslipByIdHandler implements IQueryHandler<GetPayslipByIdQuery> {
    constructor(
        @InjectRepository(Payslip)
        private readonly payslipRepository: Repository<Payslip>,
    ) { }

    async execute(query: GetPayslipByIdQuery): Promise<any> {
        const { id, userId } = query;
        return this.payslipRepository.findOne({
            where: { id, userId },
        });
    }
}
