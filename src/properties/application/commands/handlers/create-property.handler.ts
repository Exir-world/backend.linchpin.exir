import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyCommand } from '../create-property.command';
import { PropertyMapper } from 'src/properties/infrastructure/mappers/property.mapper';
import { PropertyRepository } from '../../repositories/property.repository';
import { Property } from 'src/properties/domain/property.domain';
import { PropertyCategory } from 'src/properties/domain/property-category.domain';
import { PropertyFeatureRepository } from '../../repositories/property-feature.repository';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler implements ICommandHandler<CreatePropertyCommand> {
    constructor(
        @Inject('PropertyRepository') private readonly repository: PropertyRepository,
        @Inject('PropertyFeatureRepository') private readonly featureRepository: PropertyFeatureRepository,
    ) { }

    async execute(command: CreatePropertyCommand): Promise<any> {
        const domain = new Property(
            null,
            command.code,
            new PropertyCategory(command.categoryId),
            command.status,
            new Date(),
            command.organizationId,
            command.departmentId,
            command.brand,
            command.model,
            command.description,
            command.imageUrl,
        );

        const entity = PropertyMapper.toEntity(domain);
        const newProperty = await this.repository.save(entity);

        if (command.features?.length)
            await this.featureRepository.addFeatureToProperties(newProperty.id, command.features);

        return PropertyMapper.toDomain(newProperty);
    }
}
