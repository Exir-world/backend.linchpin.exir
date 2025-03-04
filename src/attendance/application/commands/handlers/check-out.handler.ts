import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckOutCommand } from '../check-out.command';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { BadRequestException } from '@nestjs/common';
import { StopRepository } from '../../ports/stop.repository';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(CheckOutCommand)
export class CheckOutHandler implements ICommandHandler<CheckOutCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly stopRepo: StopRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: CheckOutCommand): Promise<any> {
        const attendance = await this.attendanceRepo.findLastByUserId(command.userId);

        if (!attendance || attendance.getCheckOut)
            throw new BadRequestException(this.i18n.t('attendance.checkOut.exists'));

        attendance.setCheckOut();
        if (attendance.stops.length)
            if (!attendance.stops.at(-1).getEndTime)
                await this.stopRepo.endStop(command.userId);


        await this.attendanceRepo.save([attendance]);

        return { message: this.i18n.t('attendance.checkOut.success') }
    }
}
