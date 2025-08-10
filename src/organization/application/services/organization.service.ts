import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrganizationSharedPort } from '../ports/organization-shared.port';
import { GetTeamsByOrgIdQuery } from '../queries/get-teams-by-org-id.query';
import { CreateSelfImprovementCommand } from '../commands/create-self-improvement.command';
import { GetSelfImprovementsByOrgIdQuery } from '../queries/get-self-improvements-by-org-id.query';
import { GetLocationByOrgIdQuery } from '../queries/get-location-by-org-id.query';
import { SelfImprovementItemTypeEnum } from 'src/organization/domain/enums/self-improvement-item-type.enum';
import { GetSelfImprovementsSubItemsByItemIdQuery } from '../queries/get-self-improvements-subitems-by-item-id.query';
import { CreateOrUpdateOrganizationDto } from 'src/organization/presentation/dto/create-or-update-organization.dto';
import { CreateOrganizationCommand } from '../commands/create-organization.command';
import { CreateTeamCommand } from '../commands/create-team.command';
import { GetOrganizationsByAdminIdQuery } from '../queries/get-organizations-by-admin-id.query';
import { UpdateOrganizationCommand } from '../commands/update-organization.command';
import { GetTeamsByDepartmentIdQuery } from '../queries/get-teams-by-department-id.query';
import { GetDepartmentsByOrgIdQuery } from '../queries/get-departments-by-org-id.query';
import { GetDepartmentQuery } from '../queries/get-department.query';
import { UpdateDepartmentCommand } from '../commands/update-department.command';
import { CreateDepartmentCommand } from '../commands/create-department.command';

@Injectable()
export class OrganizationService implements OrganizationSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    async getTeamsByDepartmentId(departmentId: number): Promise<any> {
        return this.queryBus.execute(new GetTeamsByDepartmentIdQuery(departmentId));
    }

    async getDepartmentById(id: number): Promise<any> {
        return this.queryBus.execute(new GetDepartmentQuery(id));
    }

    async createDepartment(createDepartmentDto: any): Promise<any> {
        return this.commandBus.execute(new CreateDepartmentCommand(createDepartmentDto));
    }

    async updateDepartment(id: number, updateDepartmentDto: any): Promise<any> {
        return this.commandBus.execute(new UpdateDepartmentCommand(id, updateDepartmentDto));
    }

    async getDepartmentsByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetDepartmentsByOrgIdQuery(orgId));
    }

    async getOrganizationsByAdminId(adminId: number): Promise<any> {
        return this.queryBus.execute(new GetOrganizationsByAdminIdQuery(adminId));
    }

    async createOrganization(dto: CreateOrUpdateOrganizationDto, creatorId: number): Promise<any> {
        return this.commandBus.execute(new CreateOrganizationCommand(dto, creatorId));
    }

    async updateOrganizationByAdmin(organizationId: number, dto: CreateOrUpdateOrganizationDto, adminId: number): Promise<any> {
        return this.commandBus.execute(new UpdateOrganizationCommand(dto, adminId, organizationId));
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
        departmentId,
        title,
        supervisorId,
        color,
        description,
    ) {
        const command = new CreateTeamCommand(
            creatorId,
            departmentId,
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