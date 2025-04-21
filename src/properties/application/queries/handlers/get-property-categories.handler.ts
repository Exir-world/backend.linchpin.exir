import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPropertyCategoriesQuery } from '../get-property-categories.query';
import { PropertyCategoryRepository } from '../../repositories/property-category.repository';

@QueryHandler(GetPropertyCategoriesQuery)
export class GetPropertyCategoriesHandler implements IQueryHandler<GetPropertyCategoriesQuery> {
    constructor(
        @Inject('PropertyCategoryRepository')
        private readonly repository: PropertyCategoryRepository,
    ) { }

    async execute(query: GetPropertyCategoriesQuery) {
        return this.repository.findAll();
    }
}