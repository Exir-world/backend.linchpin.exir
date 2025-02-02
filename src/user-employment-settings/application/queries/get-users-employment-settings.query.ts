import { IQuery } from "@nestjs/cqrs";

export class GetUsersEmploymentSettingsQuery implements IQuery {
    constructor(public readonly userIds: number[]) { }
}
