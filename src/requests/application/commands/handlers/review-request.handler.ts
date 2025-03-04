import { Inject, NotFoundException } from '@nestjs/common';
import { RequestRepository } from '../../ports/request.repository';
import { ReviewRequestCommand } from '../review-request.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IAttendanceSharedRepository } from '../../ports/attendance-shared.repository';
import { ILeaveSharedRepository } from '../../ports/leave-shared.repository';
import { RequestType } from 'src/requests/domain/enums/request-type.enum';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(ReviewRequestCommand)
export class ReviewRequestHandler implements ICommandHandler<ReviewRequestCommand> {
    constructor(
        @Inject('ILeaveSharedRepository')
        private readonly leaveRepository: ILeaveSharedRepository,
        @Inject('IAttendanceSharedRepository')
        private readonly attendanceRepository: IAttendanceSharedRepository,
        private readonly requestRepository: RequestRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: ReviewRequestCommand) {
        const request = await this.requestRepository.findOneById(command.requestId);
        if (!request) {
            throw new NotFoundException(this.i18n.t('request.request.404'));
        }

        if (command.action === 'APPROVE') {
            request.approve(command.adminId, command.adminComment);
        } else {
            request.reject(command.adminId, command.adminComment);
        }

        const updatedRequest = await this.requestRepository.save(request);

        if (command.action === 'APPROVE') {
            switch (request.type) {
                case RequestType.MANUAL_CHECK_IN:
                    // userId, checkIn
                    await this.attendanceRepository.manualCheckIn(
                        request.userId,
                        request.startTime
                    );
                    break;

                case RequestType.MANUAL_CHECK_OUT:
                    // userId, checkOut
                    await this.attendanceRepository.manualCheckOut(
                        request.userId,
                        request.startTime || request.endTime
                    );
                    break;

                case RequestType.DAILY_LEAVE:
                case RequestType.HOURLY_LEAVE:
                case RequestType.SICK_LEAVE:
                    await this.leaveRepository.createLeave(
                        request.userId,
                        this.getLeaveTypeByRequest(request.type),
                        request.startTime,
                        request.endTime,
                        request.description
                    );
                    break;

                default:
                    break;
            }
        }

        return updatedRequest;
    }

    private getLeaveTypeByRequest = (requestType: RequestType) =>
        requestType == RequestType.DAILY_LEAVE
            ? LeaveTypeEnum.DAILY
            : requestType == RequestType.HOURLY_LEAVE
                ? LeaveTypeEnum.HOURLY
                : LeaveTypeEnum.SICK;
}
