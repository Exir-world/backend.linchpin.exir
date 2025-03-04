import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { CheckOutCheckingCommand } from '../commands/check-out-checking.command';
import { DateUtil } from 'src/common/utils/date.util';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { UserEmploymentSettingsSharedPort } from 'src/user-employment-settings/application/ports/user-employment-settings-shared.port';
import { ShiftsSharedPort } from 'src/shifts/application/ports/shifts-shared.port';
import { ShiftTimeTypeEnum } from 'src/shifts/domain/enums/shift-time-type.enum';
import { isWithinRadius } from '../utils/location.util';
import { UpdateAttendanceAdminCommand } from '../commands/update-attendance-admin.command';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AttendanceService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        @Inject('OrganizationSharedPort')
        private readonly organizationService: OrganizationSharedPort,
        @Inject('UserEmploymentSettingsSharedPort')
        private readonly userEmploymentSettingsSharedPort: UserEmploymentSettingsSharedPort,
        @Inject('ShiftsSharedPort')
        private readonly shiftsSharedPort: ShiftsSharedPort,
        private readonly i18n: I18nService,
    ) { }

    /**
     * ثبت ورود
     * @param command CheckInCommand
     */
    async checkIn(userId: number, lat: number, lng: number): Promise<void> {
        const settings = await this.userEmploymentSettingsSharedPort.getSettingsByUserId(userId);
        const shifts = await this.shiftsSharedPort.getShift(settings.shiftId);

        if (settings.needLocation) {
            if (!lat || !lng) throw new BadRequestException(this.i18n.t('attendance.location.turnOn'));

            const location = await this.organizationService.getLocationByOrgId(shifts.organizationId);

            const locationChcek = isWithinRadius(lat, lng, location.lat, location.lng, location.radius);
            if (!locationChcek)
                throw new BadRequestException(this.i18n.t('attendance.location.outOfRange'));
        }

        const startOfDay = DateUtil.convertTimeToUTC(shifts.shiftTimes.at(0).startTime);

        return this.commandBus.execute(new CheckInCommand(userId, startOfDay, lat, lng));
    }

    /**
     * ثبت خروج
     * @param command CheckOutCommand
     */
    async checkOut(command: CheckOutCommand): Promise<void> {
        const { userId, lat, lng } = command;

        const settings = await this.userEmploymentSettingsSharedPort.getSettingsByUserId(userId);
        const shifts = await this.shiftsSharedPort.getShift(settings.shiftId);

        if (settings.needLocation) {
            if (!command.lat || !command.lng) throw new BadRequestException(this.i18n.t('attendance.location.turnOn'));

            const location = await this.organizationService.getLocationByOrgId(shifts.organizationId);

            const locationChcek = isWithinRadius(lat, lng, location.lat, location.lng, location.radius);
            if (!locationChcek)
                throw new BadRequestException(this.i18n.t('attendance.location.outOfRange'));
        }

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
        const nowTime = DateUtil.nowTime();

        const settings = await this.userEmploymentSettingsSharedPort.getSettingsByUserId(userId);
        const shifts = await this.shiftsSharedPort.getShift(settings.shiftId);

        // current
        let currentOrgTime = shifts.shiftTimes
            .find(time => time.type == ShiftTimeTypeEnum.WORK && time.startTime <= nowTime && time.endTime > nowTime);

        // next
        if (!currentOrgTime)
            currentOrgTime = shifts.shiftTimes
                .find(time => time.type == ShiftTimeTypeEnum.WORK && time.startTime > nowTime);

        // last
        if (!currentOrgTime)
            currentOrgTime = shifts.shiftTimes
                .find(time => time.type == ShiftTimeTypeEnum.WORK && time.endTime < nowTime);


        const currentDuration = !currentOrgTime ? null : DateUtil.getTimeDifference(currentOrgTime.endTime, currentOrgTime.startTime);

        const totalMinutes = shifts.shiftTimes.filter(time => time.type == ShiftTimeTypeEnum.WORK)
            .reduce((acc, time) => {
                return acc + DateUtil.getTimeDifference(time.endTime, time.startTime);
            }, 0);

        return this.queryBus.execute(
            new GetDailyAttendanceStatusQuery(
                userId,
                totalMinutes,
                currentDuration,
            )
        );
    }

    async getMonthlyReport(userId: number, monthAgo: number) {
        const settings = await this.userEmploymentSettingsSharedPort.getSettingsByUserId(userId);
        const shifts = await this.shiftsSharedPort.getShift(settings.shiftId);

        const totalMinutes = shifts.shiftTimes.filter(time => time.type == ShiftTimeTypeEnum.WORK)
            .reduce((acc, time) => {
                return acc + DateUtil.getTimeDifference(time.endTime, time.startTime);
            }, 0);

        return this.queryBus.execute(
            new GetMonthlyReportQuery(
                userId, monthAgo,
                totalMinutes,
            )
        );
    }

    async updateAttendanceAdmin(command: UpdateAttendanceAdminCommand): Promise<void> {
        return this.commandBus.execute(command);
    }

    // @Cron('0 0,15,30,45 * * * *')
    // @Cron('0 */3 * * * *')
    async checkOutChecking() {
        console.log('*** Check Attendances For Auto Check-Out ***');
        const settings = await this.userEmploymentSettingsSharedPort.getSettingsForAll();
        const shifts = await this.shiftsSharedPort.getShifts(settings.map(s => s.shiftId));

        const shiftIds =
            shifts.filter(shift =>
                shift.shiftTimes.filter(time =>
                    time &&
                    time.type == ShiftTimeTypeEnum.WORK &&
                    DateUtil.checkOutChecking({
                        hour: Number(time.endTime.split(':')[0]),
                        minutes: Number(time.endTime.split(':')[1]),
                    })
                ).length
            )
                .map(shift => shift.id);

        const userIds = settings.filter(s => shiftIds.includes(s.shiftId)).map(s => s.userId);

        return this.commandBus.execute(new CheckOutCheckingCommand(userIds));

        // const time = await this.organizationService.getTimeDurationByOrgId(1);

        // const isEndTime =
        //     time && time.isWorkTime &&
        //     DateUtil.checkOutChecking({
        //         hour: Number(time.currentEndTime.split(':')[0]),
        //         minutes: Number(time.currentEndTime.split(':')[1]),
        //     });

        // if (isEndTime) {
        //     const startOfCurrentTime = DateUtil.convertTimeToUTC(time.currentStartTime);
        //     return this.commandBus.execute(new CheckOutCheckingCommand(startOfCurrentTime));
        // }
    }
}
