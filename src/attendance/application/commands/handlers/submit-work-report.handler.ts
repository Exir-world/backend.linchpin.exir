import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubmitWorkReportCommand } from '../submit-work-report.command';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { WorkReportRepository } from '../../ports/work-report.repository';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(SubmitWorkReportCommand)
export class SubmitWorkReportHandler implements ICommandHandler<SubmitWorkReportCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly workReportRepo: WorkReportRepository,
        private readonly i18n: I18nService,

    ) { }

    async execute(command: SubmitWorkReportCommand): Promise<any> {
        try {
            const attendance = await this.attendanceRepo.findLastByUserId(command.userId);
            if (!attendance || attendance.getUserId != command.userId)
                throw new NotFoundException(this.i18n.t('attendance.attendance.404'));

            attendance.workReport.workReport = command.reportText;

            await this.workReportRepo.save(attendance.workReport);

            return { message: this.i18n.t('attendance.workReport.success') }

        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
