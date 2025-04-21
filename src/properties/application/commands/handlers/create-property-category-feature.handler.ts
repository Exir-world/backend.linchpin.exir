import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyCategoryFeatureCommand } from '../create-property-category-feature.command';
import { PropertyCategoryFeatureRepository } from '../../repositories/property-category-feature.repository';

@CommandHandler(CreatePropertyCategoryFeatureCommand)
export class CreatePropertyCategoryFeatureHandler implements ICommandHandler<CreatePropertyCategoryFeatureCommand> {
    constructor(
        @Inject('PropertyCategoryFeatureRepository')
        private readonly repository: PropertyCategoryFeatureRepository,
    ) { }

    async execute(command: CreatePropertyCategoryFeatureCommand) {
        return this.repository.create(command.categoryId, command.title);
    }
}