// src/modules/auth/application/queries/handlers/get-role-details.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoleDetailsQuery } from '../get-role-details.query';
import { RoleRepository } from '../../ports/role.repository';

@QueryHandler(GetRoleDetailsQuery)
export class GetRoleDetailsHandler implements IQueryHandler<GetRoleDetailsQuery> {
    constructor(private readonly roleRepository: RoleRepository) { }

    async execute(query: GetRoleDetailsQuery): Promise<any> {
        return this.roleRepository.findById(query.id);
    }
}
