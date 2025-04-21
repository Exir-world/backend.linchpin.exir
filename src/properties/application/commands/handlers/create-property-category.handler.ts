import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyCategoryCommand } from '../create-property-category.command';
import { PropertyCategoryRepository } from '../../repositories/property-category.repository';

@CommandHandler(CreatePropertyCategoryCommand)
export class CreatePropertyCategoryHandler implements ICommandHandler<CreatePropertyCategoryCommand> {
    constructor(
        @Inject('PropertyCategoryRepository')
        private readonly repository: PropertyCategoryRepository,
    ) { }

    async execute(command: CreatePropertyCategoryCommand) {
        return this.repository.create(command.title, command.features);
    }
}