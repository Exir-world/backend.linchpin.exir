import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDepartmentQuery } from '../get-department.query';
import { DepartmentEntity } from 'src/organization/infrastructure/entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetDepartmentQuery)
export class GetDepartmentHandler implements IQueryHandler<GetDepartmentQuery> {
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly depRepo: Repository<DepartmentEntity>,
    ) { }

    async execute(query: GetDepartmentQuery) {
        const { id } = query;
        return this.depRepo.findOne({ where: { id } });
    }
}
