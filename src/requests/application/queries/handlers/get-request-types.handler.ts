import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRequestTypesQuery } from '../get-request-types.query';
import { RequestType } from 'src/requests/domain/enums/request-type.enum';

@QueryHandler(GetRequestTypesQuery)
export class GetRequestTypesHandler implements IQueryHandler<GetRequestTypesQuery> {
    async execute(_: GetRequestTypesQuery): Promise<any[]> {
        return [
            { requestId: RequestType.MANUAL_CHECK_IN, title: 'تردد دستی (ورود)' },
            { requestId: RequestType.MANUAL_CHECK_OUT, title: 'تردد دستی (خروج)' },
            { requestId: RequestType.DAILY_LEAVE, title: 'مرخصی استحقاقی' },
            { requestId: RequestType.HOURLY_LEAVE, title: 'مرخصی ساعتی' },
            { requestId: RequestType.SICK_LEAVE, title: 'مرخصی استعلاجی' },
            { requestId: RequestType.OVERTIME, title: 'اضافه کار' },
        ]
    }
}
