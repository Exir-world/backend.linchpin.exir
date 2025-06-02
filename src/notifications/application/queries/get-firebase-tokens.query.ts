import { IQuery } from '@nestjs/cqrs';

export class GetFirebaseTokensQuery implements IQuery {
    constructor(
        public readonly userIds: number[],
    ) { }
}
