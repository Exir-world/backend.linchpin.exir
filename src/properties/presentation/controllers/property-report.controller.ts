import { Controller, Post, Get, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreatePropertyReportDto } from '../dto/create-property-report.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePropertyReportCommand } from 'src/properties/application/commands/create-property-report.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { GetAllReportsQuery } from 'src/properties/application/queries/get-all-reports.query';
import { PropertyReportStatusEnum } from 'src/properties/domain/enums/property-report-status.enum';
import { ChangeReportStatusCommand } from 'src/properties/application/commands/change-report-status.command';
import { ChangeReportStatusDto } from '../dto/change-report-status.dto';
import { GetReportByIdQuery } from 'src/properties/application/queries/get-reports-by-id.query';

@ApiBearerAuth()
@ApiTags('Property Reports')
@Controller('property-reports')
export class PropertyReportController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseGuards(UserAuthGuard)
    @Post()
    @ApiOperation({ summary: 'ثبت گزارش توسط کاربر' })
    createReport(@Body() dto: CreatePropertyReportDto, @Req() req) {
        const userId = req.user.id;

        const command = new CreatePropertyReportCommand(
            userId,
            dto.propertyId,
            dto.report
        );
        return this.commandBus.execute(command);
    }

    @UseGuards(AdminAuthGuard)
    @Get('all')
    @ApiOperation({ summary: 'دریافت همه گزارش‌ها (برای ادمین)' })
    @ApiQuery({ name: 'code', required: false, type: String, description: 'کد گزارش' })
    @ApiQuery({ name: 'categoryId', required: false, type: Number, description: 'شناسه دسته‌بندی' })
    @ApiQuery({ name: 'status', required: false, enum: PropertyReportStatusEnum, description: 'وضعیت گزارش' })
    getAllReports(
        @Query('code') code?: string,
        @Query('categoryId') categoryId?: number,
        @Query('status') status?: PropertyReportStatusEnum,
    ) {
        return this.queryBus.execute(new GetAllReportsQuery(code, categoryId, status));
    }

    @UseGuards(AdminAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'دریافت جزئیات گزارش‌ (برای ادمین)' })
    getReportbyId(@Param('id') id: number) {
        return this.queryBus.execute(new GetReportByIdQuery(id));
    }

    @UseGuards(AdminAuthGuard)
    @Post(':reportId/status')
    @ApiOperation({ summary: 'تغییر وضعیت گزارش توسط ادمین' })
    changeReportStatus(@Param('reportId') reportId: number, @Body() body: ChangeReportStatusDto) {
        const command = new ChangeReportStatusCommand(reportId, body.status);
        return this.commandBus.execute(command);
    }
}
