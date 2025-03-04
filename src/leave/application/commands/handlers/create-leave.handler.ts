import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLeaveCommand } from '../create-leave.command';
import { LeaveRepository } from '../../ports/leave.repository';
import { Leave } from 'src/leave/domain/leave';
import { DateUtil } from 'src/common/utils/date.util';
import { InternalServerErrorException } from '@nestjs/common';

@CommandHandler(CreateLeaveCommand)
export class CreateLeaveHandler implements ICommandHandler<CreateLeaveCommand> {
    constructor(
        private readonly leaveRepository: LeaveRepository,
    ) { }

    async execute(command: CreateLeaveCommand): Promise<Leave> {
        try {

            const leave = new Leave(
                0,
                command.type,
                command.userId,
                command.description,
                command.startTime,
                command.endTime,
                DateUtil.nowUTC(),
            );

            return await this.leaveRepository.createLeaveRequest(leave);
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
