import { IQuery } from '@nestjs/cqrs';

export class GetSelfImprovementsByOrgIdQuery implements IQuery {
    constructor(public readonly orgId: number) { }
}