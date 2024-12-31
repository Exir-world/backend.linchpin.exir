import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckOutCommand } from '../check-out.command';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@CommandHandler(CheckOutCommand)
export class CheckOutHandler implements ICommandHandler<CheckOutCommand> {
    constructor(private readonly attendanceRepo: AttendanceRepository) { }

    async execute(command: CheckOutCommand): Promise<void> {
        const attendance = await this.attendanceRepo.findLastByUserId(command.userId);
        if (!attendance)
            throw new NotFoundException('Attendance not found');

        if (attendance.getCheckOut)
            throw new BadRequestException('You are already checked out!');

        attendance.setCheckOut();
        await this.attendanceRepo.save(attendance);
    }
}
