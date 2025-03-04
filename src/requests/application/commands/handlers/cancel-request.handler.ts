import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelRequestCommand } from '../cancel-request.command';
import { RequestRepository } from '../../ports/request.repository';
import { RequestStatus } from 'src/requests/domain/enums/request-status.enum';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(CancelRequestCommand)
export class CancelRequestHandler implements ICommandHandler<CancelRequestCommand> {
    constructor(
        private readonly i18n: I18nService,
        private readonly requestRepository: RequestRepository,
    ) { }

    async execute(command: CancelRequestCommand): Promise<any> {
        const { requestId, userId } = command;
        const request = await this.requestRepository.findOneById(requestId);

        if (!request) {
            throw new NotFoundException(this.i18n.t('request.request.404'));
        }

        if (request.userId !== userId) {
            throw new ForbiddenException(this.i18n.t('request.request.forbidden'));
        }

        if (request.status !== RequestStatus.PENDING) {
            throw new BadRequestException(this.i18n.t('request.request.wrongStatusForCancel'));
        }

        request.cancel();

        await this.requestRepository.save(request);
        return { message: this.i18n.t('request.request.canceledSuccess') }
    }
}
