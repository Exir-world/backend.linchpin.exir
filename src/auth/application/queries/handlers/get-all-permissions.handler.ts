// src/modules/auth/application/queries/handlers/get-all-permissions.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPermissionsQuery } from '../get-all-permissions.query';
import { PermissionRepository } from '../../ports/permission.repository';

@QueryHandler(GetAllPermissionsQuery)
export class GetAllPermissionsHandler
    implements IQueryHandler<GetAllPermissionsQuery> {
    constructor(private readonly permissionRepository: PermissionRepository) { }

    async execute(_: GetAllPermissionsQuery): Promise<any> {
        return this.permissionRepository.findAll();
    }
}
