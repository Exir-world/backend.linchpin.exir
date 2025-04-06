import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrganizationSharedPort } from '../ports/organization-shared.port';
import { GetTeamsByOrgIdQuery } from '../queries/get-teams-by-org-id.query';
import { CreateSelfImprovementCommand } from '../commands/create-self-improvement.command';
import { GetSelfImprovementsByOrgIdQuery } from '../queries/get-self-improvements-by-org-id.query';
import { GetLocationByOrgIdQuery } from '../queries/get-location-by-org-id.query';
import { SelfImprovementItemTypeEnum } from 'src/organization/domain/enums/self-improvement-item-type.enum';
import { GetSelfImprovementsSubItemsByItemIdQuery } from '../queries/get-self-improvements-subitems-by-item-id.query';
import { CreateOrganizationDto } from 'src/organization/presentation/dto/create-organization.dto';
import { CreateOrganizationCommand } from '../commands/create-organization.command';
import { CreateTeamCommand } from '../commands/create-team.command';

@Injectable()
export class OrganizationService implements OrganizationSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    async createOrganization(dto: CreateOrganizationDto, creatorId: number): Promise<any> {
        return this.commandBus.execute(new CreateOrganizationCommand(dto, creatorId));

    }

    async getSelfImprovementsByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetSelfImprovementsByOrgIdQuery(orgId));
    }

    async getSelfImprovementsSubItemsId(itemId: number): Promise<any> {
        return this.queryBus.execute(new GetSelfImprovementsSubItemsByItemIdQuery(itemId));
    }

    async getTeamsByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetTeamsByOrgIdQuery(orgId));
    }

    async createTeam(
        creatorId,
        organizationId,
        title,
        supervisorId,
        color,
        description,
    ) {
        const command = new CreateTeamCommand(
            creatorId,
            organizationId,
            title,
            supervisorId,
            color,
            description,
        );

        return this.commandBus.execute(command);
    }

    async getLocationByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetLocationByOrgIdQuery(orgId));
    }

    async createSelfImprovement(dto: { organizationId: number, title: string, description?: string, items: { title: string; type: SelfImprovementItemTypeEnum; image: string; color: string }[] }) {
        return this.commandBus.execute(new CreateSelfImprovementCommand(
            dto.organizationId,
            dto.title,
            dto.items,
            dto.description,
        ));
    }
}