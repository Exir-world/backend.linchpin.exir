import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelRequestCommand } from '../cancel-request.command';
import { RequestRepository } from '../../ports/request.repository';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

@CommandHandler(CancelRequestCommand)
export class CancelRequestHandler implements ICommandHandler<CancelRequestCommand> {
    constructor(private readonly requestRepository: RequestRepository) { }

    async execute(command: CancelRequestCommand): Promise<any> {
        const { requestId, userId } = command;
        const request = await this.requestRepository.findOneById(requestId);

        if (!request) {
            throw new BadRequestException('Request not found');
        }

        if (request.userId !== userId) {
            throw new ForbiddenException('You are not authorized to cancel this request');
        }

        if (request.status !== RequestStatus.PENDING) {
            throw new BadRequestException('This request cannot be canceled');
        }

        request.cancel();

        await this.requestRepository.save(request);
        return { message: 'درخواست موردنظر با موفقیت لغو شد.' }
    }
}
