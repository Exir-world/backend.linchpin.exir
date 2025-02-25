import { IQuery } from '@nestjs/cqrs';

export class GetLocationByOrgIdQuery implements IQuery {
    constructor(public readonly orgId: number) { }
}