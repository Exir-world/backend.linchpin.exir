import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EndStopCommand } from '../end-stop.command';
import { StopRepository } from '../../ports/stop.repository';
import { Stop } from 'src/attendance/domain/stop';

@CommandHandler(EndStopCommand)
export class EndStopHandler implements ICommandHandler<EndStopCommand> {
    constructor(private readonly stopRepository: StopRepository) { }

    async execute(command: EndStopCommand): Promise<Stop> {
        const { userId } = command;
        return await this.stopRepository.endStop(userId);
    }
}
