import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePropertyFeatureCommand } from '../delete-property-feature.command';
import { PropertyFeatureRepository } from '../../repositories/property-feature.repository';

@CommandHandler(DeletePropertyFeatureCommand)
export class DeletePropertyFeatureHandler implements ICommandHandler<DeletePropertyFeatureCommand> {
    constructor(
        @Inject('PropertyFeatureRepository')
        private readonly repository: PropertyFeatureRepository,
    ) { }

    async execute(command: DeletePropertyFeatureCommand) {
        return this.repository.removeFeatureFromProperty(command.id);
    }
}