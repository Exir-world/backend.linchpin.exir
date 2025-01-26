import { IQuery } from '@nestjs/cqrs';

export class GetTimesByOrgIdQuery implements IQuery {
    constructor(public readonly orgId: number) { }
}