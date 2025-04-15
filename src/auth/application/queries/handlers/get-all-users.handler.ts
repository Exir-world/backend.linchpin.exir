import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../get-all-users.query';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { Inject } from '@nestjs/common';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { In } from 'typeorm';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject('OrganizationSharedPort')
        private readonly organizationService: OrganizationSharedPort,
    ) { }

    async execute(query: GetAllUsersQuery): Promise<User[]> {
        const { adminId, organId } = query;
        const condition = { organizationId: (organId as any) };
        if (!organId) {
            const organizations = await this.organizationService.getOrganizationsByAdminId(adminId);
            condition.organizationId = In(organizations.map(org => org.id));
        }

        return this.userRepository.findByCondition(condition);
    }
}
