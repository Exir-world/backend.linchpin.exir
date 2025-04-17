import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyCommand } from '../create-property.command';
import { PropertyMapper } from 'src/properties/infrastructure/mappers/property.mapper';
import { PropertyRepository } from '../../repositories/property.repository';
import { Property } from 'src/properties/domain/property.domain';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler implements ICommandHandler<CreatePropertyCommand> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
    ) { }

    async execute(command: CreatePropertyCommand): Promise<any> {
        const domain = new Property(
            null,
            command.title,
            command.code,
            command.status,
            new Date(),
            command.organizationId,
            command.departmentId,
            command.imageUrl,
        );

        const entity = PropertyMapper.toEntity(domain);
        return await this.repository.save(entity);
    }
}
