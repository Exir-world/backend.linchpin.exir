import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePropertyCategoryCommand } from '../delete-property-category.command';
import { PropertyCategoryRepository } from '../../repositories/property-category.repository';

@CommandHandler(DeletePropertyCategoryCommand)
export class DeletePropertyCategoryHandler implements ICommandHandler<DeletePropertyCategoryCommand> {
    constructor(
        @Inject('PropertyCategoryRepository')
        private readonly repository: PropertyCategoryRepository,
    ) { }

    async execute(command: DeletePropertyCategoryCommand) {
        return this.repository.delete(command.id);
    }
}