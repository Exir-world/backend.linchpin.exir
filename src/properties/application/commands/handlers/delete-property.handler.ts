import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePropertyCommand } from '../delete-property.command';
import { PropertyRepository } from '../../repositories/property.repository';

@CommandHandler(DeletePropertyCommand)
export class DeletePropertyHandler implements ICommandHandler<DeletePropertyCommand> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
    ) { }

    async execute(command: DeletePropertyCommand): Promise<any> {
        return await this.repository.delete(command.id);
    }
}
