import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTeamsByOrgIdQuery } from '../get-teams-by-org-id.query';
import { TeamEntity } from 'src/organization/infrastructure/entities/team.entity';
import { TeamMapper } from 'src/organization/infrastructure/mappers/team.mapper';

@QueryHandler(GetTeamsByOrgIdQuery)
export class GetTeamsByOrgIdHandler implements IQueryHandler<GetTeamsByOrgIdQuery> {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamsRepository: Repository<TeamEntity>) { }

    async execute(query: GetTeamsByOrgIdQuery): Promise<any> {
        const organizationId = query.orgId;

        const teams = await this.teamsRepository.find({ where: { organizationId } });
        return TeamMapper.toDomainList(teams);
    }
}