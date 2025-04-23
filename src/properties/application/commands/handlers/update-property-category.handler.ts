import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePropertyCategoryCommand } from '../update-property-category.command';
import { PropertyCategoryRepository } from '../../repositories/property-category.repository';
import { PropertyCategoryFeatureRepository } from '../../repositories/property-category-feature.repository';
import { PropertyCategoryFeature } from 'src/properties/domain/property-category-feature.domain';

@CommandHandler(UpdatePropertyCategoryCommand)
export class UpdatePropertyCategoryHandler implements ICommandHandler<UpdatePropertyCategoryCommand> {
    constructor(
        @Inject('PropertyCategoryRepository')
        private readonly repository: PropertyCategoryRepository,
        @Inject('PropertyCategoryFeatureRepository')
        private readonly featuresRepository: PropertyCategoryFeatureRepository,
    ) { }

    async execute(command: UpdatePropertyCategoryCommand) {
        const category = await this.repository.findById(command.id);

        category.title = command.title;

        const currentFeatureIds = category.features.map(feature => feature.id);
        const commandFeatureIds = command.features.map(feature => feature.id);

        // Add or update features
        for (const feature of command.features) {
            if (!feature.id) {
                // New feature
                category.features.push(new PropertyCategoryFeature(null, feature.title, { id: command.id }));
            } else if (currentFeatureIds.includes(feature.id)) {
                // Update existing feature
                const existingFeature = category.features.find(f => f.id === feature.id);
                if (existingFeature) {
                    existingFeature.title = feature.title;
                }
            }
        }
        // Remove features not in command
        const featuresToRemove = category.features.filter(feature => !commandFeatureIds.includes(feature.id));
        const featureIdsToRemove = featuresToRemove.map(feature => feature.id);

        await this.repository.update(command.id, { title: command.title });
        await this.featuresRepository.saveArray(category.features);

        await this.featuresRepository.removeByIds(featureIdsToRemove);
    }
}