import { RequestRepository } from '../../ports/request.repository';
import { CreateRequestCommand } from '../create-request.command';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';
import { RequestDomain } from 'src/requests/domain/request';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateRequestCommand)
export class CreateRequestHandler implements ICommandHandler<CreateRequestCommand> {
    constructor(private readonly requestRepository: RequestRepository) { }

    async execute(command: CreateRequestCommand): Promise<RequestDomain> {
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
