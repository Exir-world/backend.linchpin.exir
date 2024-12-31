import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRolesQuery } from '../get-roles.query';
import { RoleRepository } from '../../ports/role.repository';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
    constructor(private readonly roleRepository: RoleRepository) { }

    async execute(_: GetRolesQuery): Promise<any> {
        return this.roleRepository.findAll();
    }
}
