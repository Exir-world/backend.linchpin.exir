import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePropertyReportDto } from '../dto/create-property-report.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePropertyReportHandler } from 'src/properties/application/commands/handlers/create-property-report.handler';
import { CreatePropertyReportCommand } from 'src/properties/application/commands/create-property-report.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { GetAllReportsQuery } from 'src/properties/application/queries/get-all-reports.query';
import { GetReportsByPropertyQuery } from 'src/properties/application/queries/get-reports-by-property.query';

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
    getAllReports() {
        return this.queryBus.execute(new GetAllReportsQuery());
    }

    @UseGuards(AdminAuthGuard)
    @Get(':propertyId')
    @ApiOperation({ summary: 'دریافت گزارش‌های یک اموال خاص (برای ادمین)' })
    getReportsForProperty(@Param('propertyId') propertyId: number) {
        return this.queryBus.execute(new GetReportsByPropertyQuery(propertyId));
    }
}
