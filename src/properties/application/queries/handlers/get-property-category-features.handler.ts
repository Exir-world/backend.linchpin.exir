import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPropertyCategoryFeaturesQuery } from '../get-property-category-features.query';
import { PropertyCategoryFeatureRepository } from '../../repositories/property-category-feature.repository';

@QueryHandler(GetPropertyCategoryFeaturesQuery)
export class GetPropertyCategoryFeaturesHandler implements IQueryHandler<GetPropertyCategoryFeaturesQuery> {
    constructor(
        @Inject('PropertyCategoryFeatureRepository')
        private readonly repository: PropertyCategoryFeatureRepository,
    ) { }

    async execute(query: GetPropertyCategoryFeaturesQuery) {
        return this.repository.findAllByCategoryId(query.categoryId);
    }
}