import { IQuery } from '@nestjs/cqrs';

export class GetDepartmentQuery implements IQuery {
    constructor(public readonly id: number) { }
}
