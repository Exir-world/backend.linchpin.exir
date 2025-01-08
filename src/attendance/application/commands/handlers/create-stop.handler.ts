import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStopCommand } from '../create-stop.command';
import { StopRepository } from '../../ports/stop.repository';
import { Stop } from 'src/attendance/domain/stop';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateStopCommand)
export class CreateStopHandler implements ICommandHandler<CreateStopCommand> {
    constructor(
        private readonly stopRepository: StopRepository,
        private readonly attendanceRepository: AttendanceRepository,
    ) { }

    async execute(command: CreateStopCommand): Promise<Stop> {
        const { userId, reason } = command;
        const attendance = await this.attendanceRepository.findLastByUserId(userId);
        if (!attendance)
            throw new BadRequestException('You are not checked in!');

        if (attendance.checkOut)
            throw new BadRequestException('You are checked out!');

        return await this.stopRepository.createStop(attendance.id, reason);
    }
}
