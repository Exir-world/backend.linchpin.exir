import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePropertyCommand } from '../update-property.command';
import { PropertyRepository } from '../../repositories/property.repository';

@CommandHandler(UpdatePropertyCommand)
export class UpdatePropertyHandler implements ICommandHandler<UpdatePropertyCommand> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
    ) { }

    async execute(command: UpdatePropertyCommand): Promise<any> {
        return await this.repository.update(command.id, { ...command });
    }
}
