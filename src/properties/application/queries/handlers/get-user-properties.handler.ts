
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUserPropertiesQuery } from '../get-user-properties.query';
import { UserPropertyRepository } from '../../repositories/user-property.repository';

@QueryHandler(GetUserPropertiesQuery)
export class GetUserPropertiesHandler implements IQueryHandler<GetUserPropertiesQuery> {
    constructor(
        @Inject('UserPropertyRepository') private readonly repository: UserPropertyRepository,
    ) { }

    async execute(query: GetUserPropertiesQuery) {
        return await this.repository.findByUserId(query.userId);
    }
}
