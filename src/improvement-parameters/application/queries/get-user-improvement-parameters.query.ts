import { IQuery } from '@nestjs/cqrs';

export class GetUserImprovementParametersQuery implements IQuery {
    constructor(
        public readonly userId: number,
        public readonly parentId?: number,
    ) { }
}