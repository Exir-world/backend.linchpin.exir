import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyFeatureCommand } from '../create-property-feature.command';
import { PropertyFeatureRepository } from '../../repositories/property-feature.repository';

@CommandHandler(CreatePropertyFeatureCommand)
export class CreatePropertyFeatureHandler implements ICommandHandler<CreatePropertyFeatureCommand> {
    constructor(
        @Inject('PropertyFeatureRepository')
        private readonly repository: PropertyFeatureRepository,
    ) { }

    async execute(command: CreatePropertyFeatureCommand) {
        return this.repository.addFeatureToProperty(
            command.propertyId,
            command.featureId,
            command.value,
        );
    }
}