import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveWorkReportCommand } from '../approve-work-report.command';
import { WorkReportRepository } from '../../ports/work-report.repository';

@CommandHandler(ApproveWorkReportCommand)
export class ApproveWorkReportHandler implements ICommandHandler<ApproveWorkReportCommand> {
    constructor(
        private readonly workReportRepository: WorkReportRepository,
    ) { }

    async execute(command: ApproveWorkReportCommand): Promise<void> {
        // بازیابی گزارش کار از مخزن
        const report = await this.workReportRepository.findById(command.workReportId);
        if (!report) {
            throw new Error('Work report not found');
        }

        // اعمال تغییرات براساس دستور
        command.accepted
            ? report.accept(command.comment, command.acceptedBy)
            : report.reject(command.comment, command.acceptedBy);

        // ذخیره تغییرات
        await this.workReportRepository.save(report);
    }
}
