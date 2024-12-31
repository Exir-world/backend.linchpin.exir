import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../get-all-users.query';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}
