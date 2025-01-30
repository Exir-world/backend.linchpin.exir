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
import { Cron } from '@nestjs/schedule';
import { CheckOutCheckingCommand } from '../commands/check-out-checking.command';
import { DateUtil } from 'src/common/utils/date.util';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';

@Injectable()
export class AttendanceService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        @Inject('OrganizationSharedPort') private readonly organizationService: OrganizationSharedPort
    ) { }

    /**
     * ثبت ورود
     * @param command CheckInCommand
     */
    async checkIn(userId: number): Promise<void> {
        const times = await this.organizationService.getTimesByOrgId(1);
        const startOfDay = DateUtil.convertTimeToUTC(DateUtil.parseTime(times.at(0).getStartTime));

        return this.commandBus.execute(new CheckInCommand(userId, startOfDay));
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

    async getDailyAttendanceStatus(userId: number) {
        const durations = await this.organizationService.getTimeDurationByOrgId(1);
        return this.queryBus.execute(
            new GetDailyAttendanceStatusQuery(
                userId,
                durations?.totalDuration,
                durations?.currentDuration,
            )
        );
    }

    async getMonthlyReport(userId: number, monthAgo: number) {
        const durations = await this.organizationService.getTimeDurationByOrgId(1);
        return this.queryBus.execute(
            new GetMonthlyReportQuery(
                userId, monthAgo,
                durations?.totalDuration,
                durations?.currentDuration,
            )
        );
    }

    @Cron('0 0,15,30,45 * * * *')
    // @Cron('0 */3 * * * *')
    async checkOutChecking() {
        console.log('*** Check Attendances For Auto Check-Out ***');
        const time = await this.organizationService.getTimeDurationByOrgId(1);

        const isEndTime =
            time && time.isWorkTime &&
            DateUtil.checkOutChecking({
                hour: Number(time.currentEndTime.split(':')[0]),
                minutes: Number(time.currentEndTime.split(':')[1]),
            });

        if (isEndTime) {
            const startOfCurrentTime = DateUtil.convertTimeToUTC(time.currentStartTime);
            return this.commandBus.execute(new CheckOutCheckingCommand(startOfCurrentTime));
        }
    }
}
