import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePropertyCategoryCommand } from '../update-property-category.command';
import { PropertyCategoryRepository } from '../../repositories/property-category.repository';

@CommandHandler(UpdatePropertyCategoryCommand)
export class UpdatePropertyCategoryHandler implements ICommandHandler<UpdatePropertyCategoryCommand> {
    constructor(
        @Inject('PropertyCategoryRepository')
        private readonly repository: PropertyCategoryRepository,
    ) { }

    async execute(command: UpdatePropertyCategoryCommand) {
        return this.repository.update(command.id, { title: command.title });
    }
}