import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckOutCommand } from '../check-out.command';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StopRepository } from '../../ports/stop.repository';

@CommandHandler(CheckOutCommand)
export class CheckOutHandler implements ICommandHandler<CheckOutCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly stopRepo: StopRepository,
    ) { }

    async execute(command: CheckOutCommand): Promise<any> {
        const attendance = await this.attendanceRepo.findLastByUserId(command.userId);
        if (!attendance)
            throw new NotFoundException('Attendance not found');

        if (attendance.getCheckOut)
            throw new BadRequestException('You are already checked out!');

        attendance.setCheckOut();
        if (attendance.stops.length)
            if (!attendance.stops.at(-1).getEndTime)
                await this.stopRepo.endStop(command.userId);


        await this.attendanceRepo.save([attendance]);

        return { message: 'خروج شما با موفقیت ثبت شد' }
    }
}
