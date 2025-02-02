import { RequestRepository } from '../../ports/request.repository';
import { CreateRequestCommand } from '../create-request.command';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';
import { RequestDomain } from 'src/requests/domain/request';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateRequestCommand)
export class CreateRequestHandler implements ICommandHandler<CreateRequestCommand> {
    constructor(private readonly requestRepository: RequestRepository) { }

    async execute(command: CreateRequestCommand): Promise<RequestDomain> {
        if (command.startTime && command.endTime)
            if (command.startTime >= command.endTime)
                throw new BadRequestException('Invalid Dates');

        const request = new RequestDomain(
            null,
            command.type,
            RequestStatus.PENDING,
            command.description,
            null,
            command.userId,
            command.startTime,
            command.endTime
        );
        return await this.requestRepository.save(request);
    }
}
