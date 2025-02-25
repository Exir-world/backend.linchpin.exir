import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from 'src/organization/application/services/organization.service';
import { CreateSelfImprovementDto } from '../dto/create-self-improvement.dto';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
    ) { }

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

    @Get(':organiztionId/location')
    @ApiOperation({ summary: 'Get location by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getLocation(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getLocationByOrgId(organiztionId);
    }
}