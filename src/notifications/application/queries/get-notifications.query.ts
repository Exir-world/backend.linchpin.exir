import { IQuery } from '@nestjs/cqrs';

export class GetNotificationsQuery implements IQuery {
    constructor(
        public readonly userId: number,
        public readonly page: number = 1,
        public readonly limit: number = 10,
    ) { }
}
