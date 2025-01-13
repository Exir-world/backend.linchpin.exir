import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CheckInCommand } from '../commands/check-in.command';
import { CheckOutCommand } from '../commands/check-out.command';
import { SubmitWorkReportCommand } from '../commands/submit-work-report.command';
import { ApproveWorkReportCommand } from '../commands/approve-work-report.command';
import { GetLastAttendanceQuery } from '../queries/get-last-attendance.query';
import { CreateStopCommand } from '../commands/create-stop.command';
import { EndStopCommand } from '../commands/end-stop.command';
import { GetDailyAttendanceStatusQuery } from '../queries/get-daily-attendance-status.query';
import { GetMonthlyReportQuery } from '../queries/get-monthly-report.query';

@Injectable()
export class AttendanceService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    /**
     * ثبت ورود
     * @param command CheckInCommand
     */
    async checkIn(command: CheckInCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    /**
     * ثبت خروج
     * @param command CheckOutCommand
     */
    async checkOut(command: CheckOutCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    /**
     * ثبت گزارش کار
     * @param command SubmitWorkReportCommand
     */
    async submitWorkReport(command: SubmitWorkReportCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    /**
     * تایید یا رد گزارش کار
     * @param command ApproveWorkReportCommand
     */
    async approveOrRejectWorkReport(command: ApproveWorkReportCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    /**
     * دریافت آخرین حضور و گزارش کار
     * @param query GetLastAttendanceQuery
     */
    async getLastAttendance(query: GetLastAttendanceQuery): Promise<any> {
        return this.queryBus.execute(query);
    }

    /**
     * ثبت توقف جدید
     * @param command CreateStopCommand
     */
    async createStop(command: CreateStopCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    /**
     * پایان توقف
     * @param command EndStopCommand
     */
    async endStop(command: EndStopCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    async getDailyAttendanceStatus(query: GetDailyAttendanceStatusQuery) {
        return this.queryBus.execute(query);
    }

    async getMonthlyReport(query: GetMonthlyReportQuery) {
        return this.queryBus.execute(query);
    }
}
