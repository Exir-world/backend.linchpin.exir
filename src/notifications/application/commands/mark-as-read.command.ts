import { ICommand } from '@nestjs/cqrs';

export class MarkAsReadCommand implements ICommand {
    constructor(public readonly userId: number, public readonly ids: number[]) { }
}
