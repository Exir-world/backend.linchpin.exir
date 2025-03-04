import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckInCommand } from "../check-in.command";
import { AttendanceRepository } from "../../ports/attendance.repository";
import { Attendance } from "src/attendance/domain/attendance";
import { BadRequestException } from "@nestjs/common";
import { WorkReportRepository } from "../../ports/work-report.repository";
import { WorkReport } from "src/attendance/domain/work-report";
import { I18nService } from "nestjs-i18n";

@CommandHandler(CheckInCommand)
export class CheckInHandler implements ICommandHandler<CheckInCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly workReportRepo: WorkReportRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: CheckInCommand): Promise<any> {
        const lastAttendance = await this.attendanceRepo.findLastByUserId(command.userId);

        if (lastAttendance) {
            if (lastAttendance.getCheckIn > command.startOfDay && !lastAttendance.getCheckOut)
                throw new BadRequestException(this.i18n.t('attendance.checkIn.exists'));
            // else if (lastAttendance.getCheckOut < todayStart && !lastAttendance.getCheckOut)
            //     throw new BadRequestException('You have already checked out!');

            if (lastAttendance.getCheckIn > command.startOfDay && !lastAttendance.workReport?.workReport)
                throw new BadRequestException(this.i18n.t('attendance.workReport.submit'));
        }

        const attendance = new Attendance(0, command.userId);
        attendance.setLocation(command.lat, command.lng);

        const newAttendance = await this.attendanceRepo.save([attendance]);

        const workReport = new WorkReport(0, null, newAttendance[0])

        await this.workReportRepo.save(workReport);

        return { message: this.i18n.t('attendance.checkIn.success') }
    }
}