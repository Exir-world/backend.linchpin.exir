import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyCommand } from '../create-property.command';
import { PropertyMapper } from 'src/properties/infrastructure/mappers/property.mapper';
import { PropertyRepository } from '../../repositories/property.repository';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler implements ICommandHandler<CreatePropertyCommand> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
    ) { }

    async execute(command: CreatePropertyCommand): Promise<any> {
        const domain = PropertyMapper.toDomain({
            id: null,
            title: command.title,
            code: command.code,
            status: command.status,
            createdAt: new Date(),
            organizationId: command.organizationId,
            departmentId: command.departmentId,
            imageUrl: command.imageUrl,
        });

        const entity = PropertyMapper.toEntity(domain);
        return await this.repository.save(entity);
    }
}
