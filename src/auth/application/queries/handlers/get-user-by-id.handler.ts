import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../get-user-by-id.query';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(query: GetUserByIdQuery): Promise<User> {
        const user = await this.userRepository.findById(query.id);
        if (!user) {
            throw new NotFoundException(`User with ID ${query.id} not found`);
        }
        return user;
    }
}
