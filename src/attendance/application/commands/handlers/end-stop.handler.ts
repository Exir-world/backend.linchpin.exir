import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EndStopCommand } from '../end-stop.command';
import { StopRepository } from '../../ports/stop.repository';

@CommandHandler(EndStopCommand)
export class EndStopHandler implements ICommandHandler<EndStopCommand> {
    constructor(private readonly stopRepository: StopRepository) { }

    async execute(command: EndStopCommand): Promise<any> {
        const { userId } = command;
        await this.stopRepository.endStop(userId);

        return { message: 'پایان توقف شما با موفقیت ثبت شد' };
    }
}
