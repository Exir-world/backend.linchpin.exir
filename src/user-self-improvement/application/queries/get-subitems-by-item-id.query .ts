import { IQuery } from '@nestjs/cqrs';

export class GetSubItemsByItemIdQuery implements IQuery {
    constructor(
        public readonly userId: number,
        public readonly itemId: number,
    ) { }
}