import { IQuery } from '@nestjs/cqrs';

export class GetSelfImprovementsSubItemsByItemIdQuery implements IQuery {
    constructor(public readonly itemId: number) { }
}