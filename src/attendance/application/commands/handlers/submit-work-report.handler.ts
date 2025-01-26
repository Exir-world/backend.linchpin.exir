import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubmitWorkReportCommand } from '../submit-work-report.command';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { WorkReportRepository } from '../../ports/work-report.repository';
import { WorkReport } from 'src/attendance/domain/work-report';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(SubmitWorkReportCommand)
export class SubmitWorkReportHandler implements ICommandHandler<SubmitWorkReportCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly workReportRepo: WorkReportRepository,
    ) { }

    async execute(command: SubmitWorkReportCommand): Promise<void> {
        try {
            const attendance = await this.attendanceRepo.findById(command.attendanceId);
            if (!attendance || attendance.getUserId != command.userId)
                throw new NotFoundException('Attendance not found');

            const workReport = new WorkReport(0, command.reportText, attendance);
            attendance.attachWorkReport(workReport);

            await this.attendanceRepo.save([attendance]);
            await this.workReportRepo.save(workReport);
        } catch (error) {
            console.error('Error in CheckInHandler:', error);
            throw new Error('Failed to check-in user');
        }
    }
}
