import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserPropertyRepository } from '../../repositories/user-property.repository';
import { UnassignPropertyCommand } from '../unassign-property.command';

@CommandHandler(UnassignPropertyCommand)
export class UnassignPropertyHandler implements ICommandHandler<UnassignPropertyCommand> {
    constructor(
        @Inject('UserPropertyRepository') private readonly repository: UserPropertyRepository,
    ) { }

    async execute(command: UnassignPropertyCommand) {
        return this.repository.unassign(command.userId, command.propertyId);
    }
}
