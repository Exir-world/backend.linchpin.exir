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
import { GetAttendancesReportQuery } from '../queries/get-attendances-report.query';
import { GetDailyAttendancesReportQuery } from '../queries/get-daily-attendances-report.query';
import { GetAdminAttendancesReportQuery } from '../queries/get-admin-attendances-report.query';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { FilterAttendancesByAdminQuery } from '../queries/filter-attendances-admin.query';
import { UserTimesSharedService } from 'src/user-times/application/services/user-times-shared.service';
import { OrganizationSettingsRepositoryPort } from 'src/organization/application/ports/organization-settings.repository';
import { OrganizationSettingsDomain } from 'src/organization/domain/organization-settings.domain';
import { SharedNotificationService } from 'src/shared-notification/shared-notification.service';
import { UpsertUserLastLocationCommand } from '../commands/upsert-user-location.command';
import { GetShiftsByOrganizationQuery } from 'src/shifts/application/queries/get-shifts-by-organization.query';

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
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
        private readonly userTimesSharedService: UserTimesSharedService,
        private readonly orgSettingsRepo: OrganizationSettingsRepositoryPort,
        private readonly notificationService: SharedNotificationService,
    ) { }

    async getWorkTimesForUser(id: number, organizationId: number) {
        const jsDay = new Date().getDay();
        const shamsiDay = (jsDay + 1) % 7;

        const latestUserTime = await this.userTimesSharedService.getLatestUserTimesForUser(id);
        if (latestUserTime) {
            const times = latestUserTime.weeklyTimes.find(w => w.dayOfWeek == shamsiDay);
            return {
                startTime: times.isAbsent ? null : times?.startTime || null,
                endTime: times.isAbsent ? null : times?.endTime || null,
            }
        }

        const settings = await this.userEmploymentSettingsSharedPort.getSettingsByUserId(id);
        const shifts = await this.queryBus.execute(new GetShiftsByOrganizationQuery(organizationId));
        if (shifts?.length) {
            const shiftTimes = shifts.find(sh => sh.id == settings.shiftId)?.shiftTimes;
            return {
                startTime: shiftTimes[0]?.startTime || null,
                endTime: shiftTimes[0]?.endTime || null,
            }
        }
    }

    async handleOutOfRangeWhileCheckedIn(orgSettings: OrganizationSettingsDomain, userId: number, organizationId: number, isGpsOn: boolean) {
        this.notificationService.sendToUsers({
            userIds: [userId],
            title: 'خروج از محدوده',
            message: isGpsOn ? 'شما از محدوده کاری خود خارج شده اید' : 'لطفا لوکیشن دستگاه خود را روشن کنید',
        });

        if (orgSettings?.notifyAdminOnUserExit || true) {
            this.notificationService.sendToAdmins(
                organizationId,
                {
                    title: 'خروج از محدوده',
                    message: isGpsOn ? `کاربر با شناسه ${userId} از محدوده کاری خارج شد` : `لوکیشن کاربر با شناسه ${userId} خاموش می باشد`,
                },
                [],
            );
        }
        if (orgSettings?.registerUserExit || false) {
            await this.commandBus.execute(new CheckOutCommand(userId, 0, 0));
        }
    }

    async checkLocation(userId: number, lat: number, lng: number, organizationId: number, gpsIsOn: boolean): Promise<void> {
        const orgSettings = await this.orgSettingsRepo.findByOrganizationId(organizationId);
        const lastAttendance = await this.queryBus.execute(new GetLastAttendanceQuery(userId));
        const checkedIn = lastAttendance && !lastAttendance.checkOut;
        if (checkedIn) {
            if (!gpsIsOn) {
                this.handleOutOfRangeWhileCheckedIn(orgSettings, userId, organizationId, gpsIsOn);
            } else {
                const location = await this.organizationService.getLocationByOrgId(organizationId);
                const locationChcek = isWithinRadius(lat, lng, location.lat, location.lng, location.radius);
                if (!locationChcek) {
                    this.handleOutOfRangeWhileCheckedIn(orgSettings, userId, organizationId, gpsIsOn);
                }
                this.commandBus.execute(new UpsertUserLastLocationCommand(userId, lat, lng));
            }
        }

        await this.notificationService.sendToUsers({
            userIds: [userId],
            title: 'تست چک لوکیشن',
            message: 'درخواست با موفقیت به پایان رسید'
        })
    }

    /**
     * ثبت ورود
     * @param command CheckInCommand
     */
    async checkIn(userId: number, lat: number, lng: number, organizationId: number): Promise<void> {
        let startTime;
        const settings = await this.userEmploymentSettingsSharedPort.getSettingsByUserId(userId);
        const userTime = await this.userTimesSharedService.getLatestUserTimesForUser(userId);
        if (userTime) {
            startTime = userTime.weeklyTimes[0].startTime;
        } else {
            const shifts = await this.shiftsSharedPort.getShift(settings.shiftId);
            startTime = shifts.shiftTimes.filter(sh => sh.type == 'WORK').at(0).startTime;
        }

        if (settings.needLocation) {
            if (!lat || !lng) throw new BadRequestException(this.i18n.t('attendance.location.turnOn'));

            const location = await this.organizationService.getLocationByOrgId(organizationId);

            const locationChcek = isWithinRadius(lat, lng, location.lat, location.lng, location.radius);
            if (!locationChcek)
                throw new BadRequestException(this.i18n.t('attendance.location.outOfRange'));
        }

        const startOfDay = DateUtil.convertTimeToUTC(startTime);

        return this.commandBus.execute(new CheckInCommand(userId, startOfDay, startTime, lat, lng));
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

    async getAttendancesReport(query: GetAttendancesReportQuery): Promise<void> {
        // const { userId, startDate, endDate } = query;
        return this.queryBus.execute(query);
    }

    async getDailyAttendancesReport(query: GetDailyAttendancesReportQuery): Promise<void> {
        return this.queryBus.execute(query);
    }

    async getAdminAttendancesReport(query: GetAdminAttendancesReportQuery): Promise<any> {
        // const { userId, startDate, endDate } = query;
        const attendances = await this.queryBus.execute(query);
        const userIds = attendances.map(a => a.userId);

        const users = await this.userSharedPort.getUserByIds(userIds);

        const groupedAttendances = attendances.reduce((acc, a) => {
            const user = users.find(u => u.id == a.userId);
            if (!user) return acc;

            const existingUser = acc.find(u => u.userId == a.userId);
            if (existingUser) {
                existingUser.att.push(a);
            } else {
                acc.push({
                    userId: a.userId,
                    name: user.name,
                    lastname: user.lastname,
                    phoneNumber: user.phoneNumber,
                    att: a.attendances,
                });
            }
            return acc;
        }, []);

        return groupedAttendances;
    }

    async filterAttendancesByAdmin(userId: number, startDate: Date, endDate: Date): Promise<any> {
        const query = new FilterAttendancesByAdminQuery(userId, startDate, endDate);
        return this.queryBus.execute(query);
    }
}
