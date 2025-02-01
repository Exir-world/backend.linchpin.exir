import { IQuery } from "@nestjs/cqrs";

export class GetUserEmploymentSettingsQuery implements IQuery {
    constructor(public readonly userId: number) { }
}
