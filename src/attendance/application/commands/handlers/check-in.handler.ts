import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckInCommand } from "../check-in.command";
import { AttendanceRepository } from "../../ports/attendance.repository";
import { Attendance } from "src/attendance/domain/attendance";
import { BadRequestException } from "@nestjs/common";
import { WorkReportRepository } from "../../ports/work-report.repository";
import { WorkReport } from "src/attendance/domain/work-report";
import { I18nService } from "nestjs-i18n";
import { NEXT_TIME_ENTRY, TIME_TOLERANCE } from "src/common/constants/times.constant";

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

        const diff = this.calculateDifferenceWithNow(command.startTime);
        console.log(diff, command.startTime);

        if (diff < -(TIME_TOLERANCE + 5))
            throw new BadRequestException(this.i18n.t('attendance.nextTimeCheckIn', { args: { time: this.addMinutes(command.startTime, NEXT_TIME_ENTRY) } }));

        const attendance = new Attendance(0, command.userId);
        attendance.setLocation(command.lat, command.lng);

        const newAttendance = await this.attendanceRepo.save([attendance]);

        const workReport = new WorkReport(0, null, newAttendance[0])

        await this.workReportRepo.save(workReport);

        return { message: this.i18n.t('attendance.checkIn.success') }
    }

    private calculateDifferenceWithNow(startTime) {
        const [hour, minute] = startTime.split(':').map(Number);

        const now = new Date();
        const start = new Date();
        start.setHours(hour, minute, 0, 0);

        const diffInMs = start.getTime() - now.getTime();
        const diffInMinutes = diffInMs / 1000 / 60;

        return diffInMinutes;
    }

    private addMinutes(startTime: string, addedMins: number): string {
        // startTime به فرمت hh:mm:ss
        const [hours, minutes, seconds] = startTime.split(':').map(Number);

        // ساخت یک تاریخ فرضی
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);

        // اضافه کردن یک ساعت
        date.setHours(date.getHours() + Math.floor(addedMins / 60));

        // تبدیل دوباره به فرمت hh:mm:ss
        const newHours = String(date.getHours()).padStart(2, '0');
        const newMinutes = String(date.getMinutes()).padStart(2, '0');

        return `${newHours}:${newMinutes}`;
    }
}