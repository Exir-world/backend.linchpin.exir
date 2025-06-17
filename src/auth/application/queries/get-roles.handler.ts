import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRolesQuery } from './handlers/get-roles.query';
import { RolesRepository } from 'src/auth/infrastructure/repositories/role.repository';
import { RoleEntity } from 'src/auth/infrastructure/entities/role.entity';
import { Permission } from 'src/auth/domain/enums/permission.enum';

@QueryHandler(GetRolesQuery)
export class GetAllRolesHandler implements IQueryHandler<GetRolesQuery> {
  constructor(private readonly rolesRepository: RolesRepository) { }

  async execute(query: GetRolesQuery): Promise<RoleEntity[]> {
    const roles: any[] = await this.rolesRepository.find({
      // where: { organizationId: query.orgId },
    });

    for (let i = 0; i < roles.length; i++) {
      roles[i].permissions = Object.values(Permission).map((permission) => ({
        permission,
        access: roles[i].permissions.includes(permission),
      }));
    }

    return roles;
  }
}
