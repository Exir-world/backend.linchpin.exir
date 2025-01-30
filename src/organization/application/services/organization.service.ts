import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetTimesByOrgIdQuery } from '../queries/get-times-by-org-id.query';
import { OrganizationSharedPort } from '../ports/organization-shared.port';
import { DateUtil } from 'src/common/utils/date.util';
import { GetCreteriaByOrgIdQuery } from '../queries/get-creteria-by-org-id.query';

@Injectable()
export class OrganizationService implements OrganizationSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    async getCreteriaByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetCreteriaByOrgIdQuery(orgId));
    }

    async getTimesByOrgId(orgId: number): Promise<any> {
        return this.queryBus.execute(new GetTimesByOrgIdQuery(orgId));
    }

    async getTimeDurationByOrgId(orgId: number): Promise<any> {
        const nowTime = DateUtil.nowTime();

        const times = await this.queryBus.execute(new GetTimesByOrgIdQuery(orgId));

        const currentOrgTime = times.find(time => time.getStartTime <= nowTime && time.getEndTime > nowTime);

        const currentDuration = !currentOrgTime ? null : DateUtil.getTimeDifference(currentOrgTime.getEndTime, currentOrgTime.getStartTime);

        const totalMinutes = times.filter(time => time.getIsWorkTime)
            .reduce((acc, time) => {
                return acc + DateUtil.getTimeDifference(time.getEndTime, time.getStartTime);
            }, 0);

        return {
            totalDuration: Math.floor(totalMinutes),
            currentDuration: Math.floor(currentDuration),
            currentStartTime: currentOrgTime?.getStartTime,
            currentEndTime: currentOrgTime?.getEndTime,
            isWorkTime: currentOrgTime?.getIsWorkTime,
        };
    }
}