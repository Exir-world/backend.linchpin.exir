import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from 'src/organization/application/services/organization.service';
import { CreateSelfImprovementDto } from '../dto/create-self-improvement.dto';
import { UseGuards, Request } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { Team } from 'src/organization/domain/team.domain';
import { CreateTeamDto } from '../dto/create-team.dto';
import { CreateTeamCommand } from 'src/organization/application/commands/create-team.command';

@ApiBearerAuth()
@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
    ) { }

    @UseGuards(AdminAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new organization' })
    @ApiResponse({ status: 201, description: 'Organization created successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    async createOrganization(@Body() dto: CreateOrganizationDto, @Request() req: any) {
        const creatorUserId = req.user.id; // Extract user ID from JWT token
        return this.organizationService.createOrganization(dto, creatorUserId);
    }

    @Post('improvements')
    @ApiOperation({ summary: "Create a new self-improvement program with items" })
    @ApiResponse({ status: 201, description: "Self-improvement program created successfully." })
    @ApiResponse({ status: 400, description: "Validation error." })
    async createSelfImprovement(@Body() dto: CreateSelfImprovementDto) {
        return this.organizationService.createSelfImprovement(dto);
    }

    @Get(':organiztionId/improvements')
    @ApiOperation({ summary: 'Get improvements with items by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getCreteria(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getSelfImprovementsByOrgId(organiztionId);
    }

    @Get(':organiztionId/teams')
    @ApiOperation({ summary: 'Get teams by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getTeams(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getTeamsByOrgId(organiztionId);
    }

    @UseGuards(AdminAuthGuard)
    @Post('teams')
    @ApiOperation({ summary: 'Create a new team' })
    @ApiCreatedResponse({ type: Team })
    async create(@Body() dto: CreateTeamDto, @Request() req: any): Promise<Team> {
        const creatorId = req.user.id; // Extract user ID from JWT token
        const {
            organizationId,
            title,
            supervisorId,
            color,
            description,
        } = dto;

        return this.organizationService.createTeam(
            creatorId,
            organizationId,
            title,
            supervisorId,
            color,
            description,
        );
    }

    @Get(':organiztionId/location')
    @ApiOperation({ summary: 'Get location by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getLocation(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getLocationByOrgId(organiztionId);
    }
}