// application/handlers/get-teams-by-department-id.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTeamsByDepartmentIdQuery } from '../get-teams-by-department-id.query';
import { TeamEntity } from 'src/organization/infrastructure/entities/team.entity';

@QueryHandler(GetTeamsByDepartmentIdQuery)
export class GetTeamsByDepartmentIdHandler
    implements IQueryHandler<GetTeamsByDepartmentIdQuery> {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamRepo: Repository<TeamEntity>,
    ) { }

    async execute(query: GetTeamsByDepartmentIdQuery): Promise<TeamEntity[]> {
        const { departmentId } = query;
        return await this.teamRepo.find({
            where: { department: { id: departmentId } },
            relations: ['department'],
        });
    }
}
