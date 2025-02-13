import { IQuery } from '@nestjs/cqrs';

export class GetUserSelfImprovementsByOrgIdQuery implements IQuery {
    constructor(public readonly userId: number) { }
}