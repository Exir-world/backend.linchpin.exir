import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveWorkReportCommand } from '../approve-work-report.command';
import { WorkReportRepository } from '../../ports/work-report.repository';
import { NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(ApproveWorkReportCommand)
export class ApproveWorkReportHandler implements ICommandHandler<ApproveWorkReportCommand> {
    constructor(
        private readonly workReportRepository: WorkReportRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: ApproveWorkReportCommand): Promise<void> {
        // بازیابی گزارش کار از مخزن
        const report = await this.workReportRepository.findById(command.workReportId);
        if (!report) {
            throw new NotFoundException(this.i18n.t('attendance.workReport.404'));
        }

        // اعمال تغییرات براساس دستور
        command.accepted
            ? report.accept(command.comment, command.acceptedBy)
            : report.reject(command.comment, command.acceptedBy);

        // ذخیره تغییرات
        await this.workReportRepository.save(report);
    }
}
