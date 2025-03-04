import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EndStopCommand } from '../end-stop.command';
import { StopRepository } from '../../ports/stop.repository';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(EndStopCommand)
export class EndStopHandler implements ICommandHandler<EndStopCommand> {
    constructor(
        private readonly stopRepository: StopRepository,
        private readonly i18n: I18nService,

    ) { }

    async execute(command: EndStopCommand): Promise<any> {
        const { userId } = command;
        await this.stopRepository.endStop(userId);

        return { message: this.i18n.t('attendance.stop.end') };
    }
}
