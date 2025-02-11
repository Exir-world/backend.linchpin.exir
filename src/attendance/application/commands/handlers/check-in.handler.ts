import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckInCommand } from "../check-in.command";
import { AttendanceRepository } from "../../ports/attendance.repository";
import { Attendance } from "src/attendance/domain/attendance";
import { BadRequestException } from "@nestjs/common";
import { WorkReportRepository } from "../../ports/work-report.repository";
import { WorkReport } from "src/attendance/domain/work-report";

@CommandHandler(CheckInCommand)
export class CheckInHandler implements ICommandHandler<CheckInCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly workReportRepo: WorkReportRepository,
    ) { }

    async execute(command: CheckInCommand): Promise<any> {
        const lastAttendance = await this.attendanceRepo.findLastByUserId(command.userId);

        if (lastAttendance) {
            if (lastAttendance.getCheckIn > command.startOfDay && !lastAttendance.getCheckOut)
                throw new BadRequestException('You are already checked in!');
            // else if (lastAttendance.getCheckOut < todayStart && !lastAttendance.getCheckOut)
            //     throw new BadRequestException('You have already checked out!');

            if (lastAttendance.getCheckIn > command.startOfDay && !lastAttendance.workReport?.workReport)
                throw new BadRequestException('First submit prevoius time work report!')
        }

        const attendance = new Attendance(0, command.userId);
        const newAttendance = await this.attendanceRepo.save([attendance]);

        const workReport = new WorkReport(0, null, newAttendance[0])

        await this.workReportRepo.save(workReport);

        return { message: 'ورود شما با موفقیت ثبت شد' }
    }
}