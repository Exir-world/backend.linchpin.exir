import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { GetAllUsersWithTeamQuery } from '../get-all-users-with-team.query';
import { In } from 'typeorm';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAllUsersWithTeamQuery)
export class GetAllUsersWithTeamHandler implements IQueryHandler<GetAllUsersWithTeamQuery> {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject('OrganizationSharedPort') private readonly organizationSharedPort: OrganizationSharedPort,
    ) { }

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        const teams = await this.organizationSharedPort.getTeamsByOrgId(1);

        return users.map(user => ({
            ...user,
            team: teams.find(team => team.id === user.teamId),
        }));
    }
}
