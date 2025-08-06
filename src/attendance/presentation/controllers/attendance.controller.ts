import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus, UseGuards, Request, BadRequestException, Patch, Res, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from '../../application/services/attendance.service';
import { SubmitWorkReportDto } from '../dto/submit-work-report.dto';
import { ApproveWorkReportDto } from '../dto/approve-work-report.dto';
import { CheckInCommand } from 'src/attendance/application/commands/check-in.command';
import { CheckOutCommand } from 'src/attendance/application/commands/check-out.command';
import { SubmitWorkReportCommand } from 'src/attendance/application/commands/submit-work-report.command';
import { ApproveWorkReportCommand } from 'src/attendance/application/commands/approve-work-report.command';
import { GetLastAttendanceQuery } from 'src/attendance/application/queries/get-last-attendance.query';
import { CreateStopDto } from '../dto/create-stop.dto';
import { CreateStopCommand } from 'src/attendance/application/commands/create-stop.command';
import { EndStopCommand } from 'src/attendance/application/commands/end-stop.command';
import { GetDailyAttendanceStatusQuery } from 'src/attendance/application/queries/get-daily-attendance-status.query';
import { GetMonthlyReportQuery } from 'src/attendance/application/queries/get-monthly-report.query';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { PermissionsGuard } from 'src/auth/application/guards/permission.guard';
import { CheckOutCheckingCommand } from 'src/attendance/application/commands/check-out-checking.command';
import { CheckInDto } from '../dto/check-in.dto';
import { CheckOutDto } from '../dto/check-out.dto';
import { UpdateAttendanceAdminCommand } from 'src/attendance/application/commands/update-attendance-admin.command';
import { UpdateAttendanceAdminDto } from '../dto/update-attendance-admin.dto';
import { GetAttendancesReportDto } from '../dto/get-attendances-report.dto';
import { GetAttendancesReportQuery } from 'src/attendance/application/queries/get-attendances-report.query';
import { GetDailyAttendancesReportDto } from '../dto/get-daily-attendances-report.dto';
import { GetDailyAttendancesReportQuery } from 'src/attendance/application/queries/get-daily-attendances-report.query';
import { GetAdminAttendancesReportDto } from '../dto/get-admin-attendances-report.dto';
import { GetAdminAttendancesReportQuery } from 'src/attendance/application/queries/get-admin-attendances-report.query';
import { generateExcel } from 'src/attendance/application/utils/excel.util';
import { Response } from 'express';
import { Permissions } from 'src/auth/application/decorators/permissions.decorator';
import { Permission } from 'src/auth/domain/enums/permission.enum';
import { CheckLocationDto } from '../dto/check-location.dto';

@ApiBearerAuth()
@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @UseGuards(UserAuthGuard)
    @Post('main-page')
    @ApiOperation({ summary: 'اعمال صفحه اصلی' })
    @ApiResponse({ status: 200 })
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        description: 'Action payload',
        schema: {
            type: 'object',
            properties: {
                actionType: {
                    type: 'string',
                    example: 'check-in',
                },
                reason: {
                    type: 'string',
                    example: 'string',
                },
                workReport: {
                    type: 'string',
                    example: 'string',
                },
                lat: {
                    type: 'number',
                    example: 36.3636,
                },
                lng: {
                    type: 'number',
                    example: 59.5959,
                },
            },
        },
    })
    async mainPageActions(@Request() req, @Body() body: { actionType: string; workReport?: string; reason?: string, lat: number, lng: number }) {
        const { lat, lng } = body;
        const organizationId = req.user.organizationId;

        switch (body.actionType) {
            case 'check-in':
                await this.attendanceService.checkIn(req.user.id, lat, lng, organizationId);
                break;
            case 'check-out':
                if (!body.workReport) throw new BadRequestException('Submit your work report!');
                await this.attendanceService.checkOut(new CheckOutCommand(req.user.id, lat, lng));
                await this.attendanceService.submitWorkReport(new SubmitWorkReportCommand(body.workReport, req.user.id));
                break;
            case 'stop-start':
                await await this.attendanceService.createStop(new CreateStopCommand(req.user.id, body.reason));
                break;
            case 'stop-end':
                await await this.attendanceService.endStop(new EndStopCommand(req.user.id));
                break;
        }

        return this.attendanceService.getDailyAttendanceStatus(req.user.id);
    }

    @UseGuards(UserAuthGuard)
    @Post('check-in')
    @ApiOperation({ summary: 'ثبت ورود کاربر' })
    @ApiResponse({ status: 200, description: 'ورود با موفقیت ثبت شد.' })
    @HttpCode(HttpStatus.OK)
    async checkIn(@Request() req, @Body() dto: CheckInDto) {
        const { lat, lng } = dto;
        const organizationId = req.user.organizationId;
        return this.attendanceService.checkIn(req.user.id, lat, lng, organizationId);
    }

    @UseGuards(UserAuthGuard)
    @Post('check-out')
    @ApiOperation({ summary: 'ثبت خروج کاربر' })
    @ApiResponse({ status: 200, description: 'خروج با موفقیت ثبت شد.' })
    @HttpCode(HttpStatus.OK)
    async checkOut(@Request() req, @Body() dto: CheckOutDto) {
        const { lat, lng } = dto;
        return this.attendanceService.checkOut(new CheckOutCommand(req.user.id, lat, lng));
    }

    @UseGuards(UserAuthGuard)
    @Post('work-report')
    @ApiOperation({ summary: 'ثبت گزارش کار' })
    @ApiResponse({ status: 200, description: 'گزارش کار با موفقیت ثبت شد.' })
    @HttpCode(HttpStatus.OK)
    async submitWorkReport(@Request() req, @Body() dto: SubmitWorkReportDto) {
        return this.attendanceService.submitWorkReport(
            new SubmitWorkReportCommand(
                dto.reportText,
                req.user.id
            )
        );
    }

    @UseGuards(UserAuthGuard, PermissionsGuard)
    @Post('work-report/approve')
    @ApiOperation({ summary: 'تأیید یا رد گزارش کار' })
    @ApiResponse({ status: 200, description: 'گزارش کار تأیید یا رد شد.' })
    @HttpCode(HttpStatus.OK)
    async approveWorkReport(@Request() req, @Body() dto: ApproveWorkReportDto) {
        return this.attendanceService.approveOrRejectWorkReport(
            new ApproveWorkReportCommand(
                dto.workReportId,
                dto.accepted,
                dto.comment,
                req.user.id,
            )
        );
    }

    @UseGuards(UserAuthGuard)
    @Get('last')
    @ApiOperation({ summary: 'دریافت آخرین رکورد حضور و غیاب کاربر' })
    @ApiResponse({ status: 200, description: 'آخرین رکورد حضور و غیاب با موفقیت دریافت شد.' })
    async getLastAttendance(@Request() req) {
        return this.attendanceService.getLastAttendance(new GetLastAttendanceQuery(req.user.id));
    }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'Create a new stop for an attendance' })
    @Post('stop/new')
    async createStop(@Request() req, @Body() createStopDto: CreateStopDto) {
        return await this.attendanceService.createStop(
            new CreateStopCommand(req.user.id, createStopDto.reason),
        );
    }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'End an existing stop' })
    @Post('stop/end')
    async endStop(@Request() req) {
        return await this.attendanceService.endStop(
            new EndStopCommand(req.user.id),
        );
    }

    @UseGuards(UserAuthGuard)
    @Get('daily')
    @ApiOperation({ summary: 'دریافت وضعیت روزانه حضور و غیاب کاربر' })
    @ApiResponse({ status: 200, description: 'حضور و غیاب با موفقیت دریافت شد.' })
    async getDailyAttendanceStatus(@Request() req) {
        return this.attendanceService.getDailyAttendanceStatus(req.user.id);
    }

    @UseGuards(UserAuthGuard)
    @Get('report/months/:month')
    @ApiOperation({ summary: 'دریافت گزارش عملکرد کاربر' })
    @ApiResponse({ status: 200, description: 'با موفقیت دریافت شد.' })
    async getMonthlyReport(@Request() req, @Param('month') month: number) {
        return this.attendanceService.getMonthlyReport(req.user.id, month);
    }

    @UseGuards(UserAuthGuard, PermissionsGuard)
    @Patch('admin')
    @ApiOperation({ summary: 'ویرایش حضور و غیاب' })
    @ApiResponse({ status: 200, description: 'با موفقیت انجام شد.' })
    async updateByAdmin(@Body() dto: UpdateAttendanceAdminDto) {
        return this.attendanceService.updateAttendanceAdmin(
            new UpdateAttendanceAdminCommand(
                dto.attendanceId,
                dto.checkIn,
                dto.checkOut,
            )
        );
    }

    @UseGuards(UserAuthGuard)
    @Post('report')
    @ApiOperation({})
    @HttpCode(HttpStatus.OK)
    async getAttendancesReport(@Request() req, @Body() dto: GetAttendancesReportDto) {
        const { startDate, endDate } = dto;
        return this.attendanceService.getAttendancesReport(
            new GetAttendancesReportQuery(
                req.user.id, startDate, endDate
            )
        );
    }

    @UseGuards(UserAuthGuard)
    @Post('daily/report')
    @ApiOperation({})
    @HttpCode(HttpStatus.OK)
    async getAttendancesDailyReport(@Request() req, @Body() dto: GetDailyAttendancesReportDto) {
        const { date } = dto;
        return this.attendanceService.getDailyAttendancesReport(
            new GetDailyAttendancesReportQuery(
                req.user.id, date
            )
        );
    }

    @Permissions(Permission.ReportAttendance)
    @UseGuards(UserAuthGuard, PermissionsGuard)
    @Post('admin/report')
    @ApiOperation({})
    @HttpCode(HttpStatus.OK)
    async getAdminAttendancesReport(
        @Res() res: Response,
        @Body() dto: GetAdminAttendancesReportDto
    ) {
        const workDuration = 440;

        const { startDate, endDate, holidaysDayCount, userId } = dto;
        const attendances = await this.attendanceService.getAdminAttendancesReport(
            new GetAdminAttendancesReportQuery(startDate, endDate, holidaysDayCount, userId)
        );

        generateExcel(res, attendances, workDuration, holidaysDayCount);

        return attendances;
    }

    @UseGuards(UserAuthGuard, PermissionsGuard)
    @Get('admin/filter')
    @ApiOperation({ summary: 'دریافت گزارش حضور و غیاب توسط ادمین' })
    @ApiResponse({ status: 200, description: 'گزارش حضور و غیاب با موفقیت دریافت شد.' })
    @ApiQuery({ name: 'userId', required: false, type: String, description: 'شناسه کاربر' })
    @ApiQuery({ name: 'startDate', required: false, type: String, description: 'تاریخ شروع' })
    @ApiQuery({ name: 'endDate', required: false, type: String, description: 'تاریخ پایان' })
    async filterAttendancesByAdmin(
        @Query('userId') userId?: number,
        @Query('startDate') startDate?: Date,
        @Query('endDate') endDate?: Date,
    ) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const endToday = new Date();
        endToday.setHours(23, 59, 59, 999);

        return this.attendanceService.filterAttendancesByAdmin(
            userId,
            startDate || todayStart,
            endDate || endToday,
        );
    }

    @UseGuards(UserAuthGuard)
    @Post('check-location')
    @ApiOperation({ summary: 'بررسی لوکیشن کاربر در زمان ورود' })
    async checkLocation(@Request() req, @Body() dto: CheckLocationDto) {
        const { lat, lng, gpsIsOn } = dto;
        const organizationId = req.user.organizationId;
        return this.attendanceService.checkLocation(req.user.id, lat, lng, organizationId, gpsIsOn);
    }

    @UseGuards(UserAuthGuard)
    @Get('work-times-for-user')
    @ApiOperation({ summary: 'دریافت ساعت شروع و پایان برای کاربر' })
    async getWorkTimesForUser(@Request() req) {
        const { id, organizationId } = req.user;
        return this.attendanceService.getWorkTimesForUser(id, organizationId);
    }

    // @ApiOperation({})
    // @Post('auto-check-out')
    // async autoCheckout(@Request() req) {
    //     return await this.attendanceService.checkOutChecking();
    // }
}
