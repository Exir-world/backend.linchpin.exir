import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CalculatePayrollCommand } from "../calculate-payroll.command";
import { Inject } from "@nestjs/common";
import { IUserSharedRepository } from "../../ports/user-shared.repository";
import { UserEmploymentSettingsSharedPort } from "src/user-employment-settings/application/ports/user-employment-settings-shared.port";
import { AttendanceSharedRepository } from "src/attendance/application/ports/attendance-shared.repository";
import { DateUtil } from "src/common/utils/date.util";
import { SalaryFormula } from "src/payroll/domain/value-objects/salary-formula";

@CommandHandler(CalculatePayrollCommand)
export class CalculatePayrollHandler implements ICommandHandler<CalculatePayrollCommand> {
    constructor(
        @Inject('IUserSharedRepository')
        private readonly userSharedRepository: IUserSharedRepository,
        @Inject('UserEmploymentSettingsSharedPort')
        private readonly userSettingsRepository: UserEmploymentSettingsSharedPort,
        @Inject('AttendanceSharedRepository')
        private readonly attendanceSharedRepository: AttendanceSharedRepository,
    ) { }

    async execute(command: CalculatePayrollCommand): Promise<any> {
        const { organizationId, startTime, endTime } = command;

        const baseSalaryPerHour = 45000;

        const users = await this.userSharedRepository.getUsersByOrgId(organizationId);
        const settings = await this.userSettingsRepository.getSettingsByUsersId(users.map(user => user.id));

        const attendances = await this.attendanceSharedRepository.findByUserIds(
            users.map(user => user.id), startTime, endTime
        );

        const payrolls = [];

        for (let i = 0; i < users.length; i++) {
            const userId = users[i].id;
            const userName = users[i].name;
            const userCoef = settings.find(s => s.userId == userId)?.salaryCoef || 0;

            const userAttendances = attendances.find(att => att.userId == userId)?.attendances || [];

            // محاسبه مجموع زمان کار
            const workMinutes = userAttendances.reduce((total, record) => {
                const checkIn = DateUtil.fromJsDate(record.checkIn);
                const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;

                // محاسبه زمان حضور (Attendance Duration)
                const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

                // محاسبه زمان توقف (Stops Duration)
                const stopsMinutes = record.stops.reduce((stopTotal, stop) => {
                    const stopStart = DateUtil.fromJsDate(stop.startTime);
                    const stopEnd = stop.endTime ? DateUtil.fromJsDate(stop.endTime) : stopStart;
                    return stopTotal + stopEnd.diff(stopStart, 'minutes').minutes;
                }, 0);

                return total + (attendanceMinutes - stopsMinutes);
            }, 0);

            payrolls.push({
                userId,
                userName,
                workDurationInMinutes: parseFloat(workMinutes.toFixed(2)),
                workDurationInHours: parseFloat((workMinutes / 60).toFixed(2)),
                salary: parseFloat(SalaryFormula.calculateSalary(workMinutes / 60, 0, userCoef, baseSalaryPerHour, 0).toFixed(0))
            });
        }

        return payrolls;
    }
}
