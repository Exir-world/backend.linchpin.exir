import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckInCommand } from "../check-in.command";
import { AttendanceRepository } from "../../ports/attendance.repository";
import { Attendance } from "src/attendance/domain/attendance";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CheckInCommand)
export class CheckInHandler implements ICommandHandler<CheckInCommand> {
    constructor(private readonly attendanceRepo: AttendanceRepository) { }

    async execute(command: CheckInCommand): Promise<any> {
        const lastAttendance = await this.attendanceRepo.findLastByUserId(command.userId);
        if (lastAttendance && !lastAttendance.getCheckOut)
            throw new BadRequestException('You are already checked in!');

        const attendance = new Attendance(0, command.userId);
        await this.attendanceRepo.save(attendance);

        return { message: 'ورود شما با موفقیت ثبت شد' }
    }
}