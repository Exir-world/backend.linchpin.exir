import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
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
}