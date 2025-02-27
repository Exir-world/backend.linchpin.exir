import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAttendanceAdminCommand } from '../update-attendance-admin.command';
import { AttendanceRepository } from '../../ports/attendance.repository';

@CommandHandler(UpdateAttendanceAdminCommand)
export class UpdateAttendanceAdminHandler implements ICommandHandler<UpdateAttendanceAdminCommand> {
    constructor(
        private readonly attendanceRepository: AttendanceRepository,
    ) { }

    async execute(command: UpdateAttendanceAdminCommand): Promise<void> {
        const att = await this.attendanceRepository.findById(command.id);
        if (command.checkIn)
            att.checkIn = command.checkIn;

        if (command.checkOut)
            att.checkOut = command.checkOut;

        await this.attendanceRepository.save([att]);
    }
}
