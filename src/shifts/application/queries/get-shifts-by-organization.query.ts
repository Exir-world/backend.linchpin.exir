import { IQuery } from "@nestjs/cqrs";

export class GetShiftsByOrganizationQuery implements IQuery {
    constructor(public readonly organizationId: number) { }
}
