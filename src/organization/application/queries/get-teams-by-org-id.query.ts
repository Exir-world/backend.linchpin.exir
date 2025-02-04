import { IQuery } from '@nestjs/cqrs';

export class GetTeamsByOrgIdQuery implements IQuery {
    constructor(public readonly orgId: number) { }
}