import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRequestTypesQuery } from '../get-request-types.query';
import { RequestType } from 'src/requests/domain/enums/request-type.enum';
import { I18nService } from 'nestjs-i18n';

@QueryHandler(GetRequestTypesQuery)
export class GetRequestTypesHandler implements IQueryHandler<GetRequestTypesQuery> {
    constructor(
        private readonly i18n: I18nService
    ) { }
    async execute(_: GetRequestTypesQuery): Promise<any[]> {
        return [
            { requestId: RequestType.MANUAL_CHECK_IN, title: this.i18n.t('request.types.manualCheckIn') },
            { requestId: RequestType.MANUAL_CHECK_OUT, title: this.i18n.t('request.types.manualCheckOut') },
            { requestId: RequestType.DAILY_LEAVE, title: this.i18n.t('request.types.dailyLeave') },
            { requestId: RequestType.HOURLY_LEAVE, title: this.i18n.t('request.types.houlyLeave') },
            { requestId: RequestType.SICK_LEAVE, title: this.i18n.t('request.types.sickLeave') },
            // { requestId: RequestType.OVERTIME, title: 'اضافه کار' },
        ]
    }
}
