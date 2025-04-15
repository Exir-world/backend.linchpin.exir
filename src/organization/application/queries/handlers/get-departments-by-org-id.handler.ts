// application/handlers/get-departments-by-org-id.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetDepartmentsByOrgIdQuery } from '../get-departments-by-org-id.query';
import { DepartmentEntity } from 'src/organization/infrastructure/entities/department.entity';

@QueryHandler(GetDepartmentsByOrgIdQuery)
export class GetDepartmentsByOrgIdHandler
    implements IQueryHandler<GetDepartmentsByOrgIdQuery> {
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly departmentRepo: Repository<DepartmentEntity>,
    ) { }

    async execute(query: GetDepartmentsByOrgIdQuery): Promise<DepartmentEntity[]> {
        const { orgId } = query;
        return await this.departmentRepo.find({
            where: { organizationId: orgId },
            relations: ['organization', 'teams'],
        });
    }
}
