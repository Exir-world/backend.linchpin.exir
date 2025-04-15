import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePropertyReportDto } from '../dto/create-property-report.dto';

@ApiBearerAuth()
@ApiTags('Property Reports')
@Controller('property-reports')
export class PropertyReportController {

    @Post()
    @ApiOperation({ summary: 'ثبت گزارش توسط کاربر' })
    createReport(@Body() dto: CreatePropertyReportDto) {
        return 'TODO: call service to create property report';
    }

    @Get('all')
    @ApiOperation({ summary: 'دریافت همه گزارش‌ها (برای ادمین)' })
    getAllReports() {
        return 'TODO: call service to get all property reports';
    }

    @Get(':propertyId')
    @ApiOperation({ summary: 'دریافت گزارش‌های یک اموال خاص (برای ادمین)' })
    getReportsForProperty(@Param('propertyId') propertyId: number) {
        return `TODO: call service to get reports for property ${propertyId}`;
    }
}
