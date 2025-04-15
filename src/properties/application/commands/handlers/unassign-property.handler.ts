import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignPropertyCommand } from '../assign-property.command';
import { UserPropertyRepository } from '../../repositories/user-property.repository';

@CommandHandler(AssignPropertyCommand)
export class UnassignPropertyHandler implements ICommandHandler<AssignPropertyCommand> {
    constructor(
        @Inject('UserPropertyRepository') private readonly repository: UserPropertyRepository,
    ) { }

    async execute(command: AssignPropertyCommand) {
        return this.repository.unassign(command.userId, command.propertyId);
    }
}
