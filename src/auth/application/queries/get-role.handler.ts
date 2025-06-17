import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoleQuery } from './handlers/get-role.query';
import { RolesRepository } from 'src/auth/infrastructure/repositories/role.repository';
import { RoleEntity } from 'src/auth/infrastructure/entities/role.entity';
import { NotFoundException } from '@nestjs/common';
import { Permission } from 'src/auth/domain/enums/permission.enum';

@QueryHandler(GetRoleQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleQuery> {
  constructor(private readonly rolesRepository: RolesRepository) { }

  async execute(query: GetRoleQuery): Promise<RoleEntity> {
    const { id } = query;
    const role: any = await this.rolesRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    role.permissions = Object.values(Permission).map((permission) => ({
      permission,
      access: role.permissions.includes(permission),
    }));

    return role;
  }
}
