import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignPropertyCommand } from '../assign-property.command';
import { UserPropertyRepository } from '../../repositories/user-property.repository';
import { UserPropertyEntity } from 'src/properties/infrastructure/entities/user-property.entity';

@CommandHandler(AssignPropertyCommand)
export class AssignPropertyHandler implements ICommandHandler<AssignPropertyCommand> {
    constructor(
        @Inject('UserPropertyRepository') private readonly repository: UserPropertyRepository,
    ) { }

    async execute(command: AssignPropertyCommand) {
        const { userId, propertyIds } = command;
        const entities = propertyIds.map(propertyId => {
            const entity = new UserPropertyEntity();
            entity.userId = userId;
            entity.propertyId = propertyId;
            return entity;
        });
        return await this.repository.assign(entities);
    }
}
