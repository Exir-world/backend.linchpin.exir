import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from 'src/organization/application/services/organization.service';
import { CreateSelfImprovementDto } from '../dto/create-self-improvement.dto';
import { UseGuards, Request } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { CreateOrUpdateOrganizationDto } from '../dto/create-or-update-organization.dto';
import { Team } from 'src/organization/domain/team.domain';
import { CreateTeamDto } from '../dto/create-team.dto';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

@ApiBearerAuth()
@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
    ) { }

    @UseGuards(AdminAuthGuard)
    @Get('admin/organizations')
    @ApiOperation({ summary: 'Get organizations for admin' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Admin not found or no organizations available' })
    async getOrganizationsForAdmin(@Request() req: any) {
        const adminId = req.user.id; // Extract admin ID from JWT token
        return this.organizationService.getOrganizationsByAdminId(adminId);
    }

    @UseGuards(AdminAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new organization' })
    @ApiResponse({ status: 201, description: 'Organization created successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    async createOrganization(@Body() dto: CreateOrUpdateOrganizationDto, @Request() req: any) {
        const creatorUserId = req.user.id; // Extract user ID from JWT token
        return this.organizationService.createOrganization(dto, creatorUserId);
    }

    @UseGuards(AdminAuthGuard)
    @Patch('admin/organizations/:organizationId')
    @ApiOperation({ summary: 'Update an organization by admin' })
    @ApiParam({ name: 'organizationId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Organization updated successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    @ApiResponse({ status: 404, description: 'Organization not found.' })
    async updateOrganizationByAdmin(
        @Param('organizationId') organizationId: number,
        @Body() dto: CreateOrUpdateOrganizationDto,
        @Request() req: any
    ) {
        const adminId = req.user.id; // Extract admin ID from JWT token
        return this.organizationService.updateOrganizationByAdmin(organizationId, dto, adminId);
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

    @Get(':organiztionId/departments')
    @ApiOperation({ summary: 'Get departments by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getDepartments(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getDepartmentsByOrgId(organiztionId);
    }

    @UseGuards(AdminAuthGuard)
    @Get(':organiztionId/teams')
    @ApiOperation({ summary: 'Get teams by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getTeams(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getTeamsByOrgId(organiztionId);
    }

    @UseGuards(AdminAuthGuard)
    @Get('departments/:departmentId/teams')
    @ApiOperation({ summary: 'Get teams by department ID' })
    @ApiParam({ name: 'departmentId', required: true, description: 'Department ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Department not found' })
    getTeamsByDepartmentId(@Param('departmentId') departmentId: number): any {
        return this.organizationService.getTeamsByDepartmentId(departmentId);
    }

    @UseGuards(AdminAuthGuard)
    @Post('departments')
    @ApiOperation({ summary: 'Create a new department' })
    @ApiResponse({ status: 201, description: 'Department created successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    async createDepartment(@Body() dto: CreateDepartmentDto, @Request() req: any) {
        // const creatorUserId = req.user.id; // Extract user ID from JWT token
        return this.organizationService.createDepartment(dto);
    }

    @UseGuards(AdminAuthGuard)
    @Patch('departments/:departmentId')
    @ApiOperation({ summary: 'Update a department by ID' })
    @ApiParam({ name: 'departmentId', required: true, description: 'Department ID' })
    @ApiResponse({ status: 200, description: 'Department updated successfully.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    @ApiResponse({ status: 404, description: 'Department not found.' })
    async updateDepartment(
        @Param('departmentId') departmentId: number,
        @Body() dto: UpdateDepartmentDto,
        @Request() req: any
    ) {
        // const adminId = req.user.id; // Extract admin ID from JWT token
        return this.organizationService.updateDepartment(departmentId, dto);
    }

    @UseGuards(AdminAuthGuard)
    @Get('departments/:departmentId')
    @ApiOperation({ summary: 'Get a department by ID' })
    @ApiParam({ name: 'departmentId', required: true, description: 'Department ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Department not found' })
    async getDepartmentById(@Param('departmentId') departmentId: number): Promise<any> {
        return this.organizationService.getDepartmentById(departmentId);
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