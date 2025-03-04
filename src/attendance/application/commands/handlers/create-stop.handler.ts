import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStopCommand } from '../create-stop.command';
import { StopRepository } from '../../ports/stop.repository';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { BadRequestException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(CreateStopCommand)
export class CreateStopHandler implements ICommandHandler<CreateStopCommand> {
    constructor(
        private readonly stopRepository: StopRepository,
        private readonly attendanceRepository: AttendanceRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: CreateStopCommand): Promise<any> {
        const { userId, reason } = command;
        const attendance = await this.attendanceRepository.findLastByUserId(userId);
        if (!attendance)
            throw new BadRequestException(this.i18n.t('attendance.checkIn.404'));

        if (attendance.checkOut)
            throw new BadRequestException(this.i18n.t('attendance.checkOut.exists'));

        await this.stopRepository.createStop(attendance.id, reason);

        return { message: this.i18n.t('attendance.stop.success') };
    }
}
