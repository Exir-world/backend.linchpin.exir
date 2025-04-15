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
        const entity = new UserPropertyEntity();
        entity.userId = command.userId;
        entity.propertyId = command.propertyId;
        return await this.repository.assign(entity);
    }
}
