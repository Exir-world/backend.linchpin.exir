import { IQuery } from '@nestjs/cqrs';

export class GetCreteriaByOrgIdQuery implements IQuery {
    constructor(public readonly orgId: number) { }
}