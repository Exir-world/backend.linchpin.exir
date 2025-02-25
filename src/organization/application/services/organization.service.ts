import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrganizationSharedPort } from '../ports/organization-shared.port';
import { GetTeamsByOrgIdQuery } from '../queries/get-teams-by-org-id.query';
import { CreateSelfImprovementCommand } from '../commands/create-self-improvement.command';
import { GetSelfImprovementsByOrgIdQuery } from '../queries/get-self-improvements-by-org-id.query';
import { GetLocationByOrgIdQuery } from '../queries/get-location-by-org-id.query';

@Injectable()
export class OrganizationService implements OrganizationSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    async getSelfImprovementsByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetSelfImprovementsByOrgIdQuery(orgId));
    }

    async getTeamsByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetTeamsByOrgIdQuery(orgId));
    }

    async getLocationByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetLocationByOrgIdQuery(orgId));
    }

    async createSelfImprovement(dto: { organizationId: number, title: string, description?: string, items: { title: string; score: number; image: string; color: string }[] }) {
        return this.commandBus.execute(new CreateSelfImprovementCommand(
            dto.organizationId,
            dto.title,
            dto.items,
            dto.description,
        ));
    }
}