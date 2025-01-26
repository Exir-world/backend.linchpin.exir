import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from '../application/services/organization.service';
import { GetTimesByOrgIdQuery } from '../application/queries/get-times-by-org-id.query';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
    ) { }

    @Get(':organiztionId/times')
    @ApiOperation({ summary: 'Get times by organization ID' })
    @ApiParam({ name: 'organiztionId', required: true, description: 'Organization ID' })
    @ApiResponse({ status: 200, description: 'Successful response' })
    @ApiResponse({ status: 404, description: 'Organization not found' })
    getTimes(@Param('organiztionId') organiztionId: number): any {
        return this.organizationService.getTimesByOrgId(organiztionId);
    }
}