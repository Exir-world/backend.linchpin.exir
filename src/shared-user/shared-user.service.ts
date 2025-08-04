import { Inject, Injectable } from '@nestjs/common';
import { UserSharedRepository } from 'src/auth/application/ports/user-shared.repository';
import { GetUsersDto } from './dto/get-users.dto';
import { UserDto } from 'src/shared/dto/user.dto';

@Injectable()
export class SharedUsersService {
    constructor(
        @Inject('UserSharedRepository')
        private readonly userSharedPort: UserSharedRepository,
    ) { }

    async getUsers(dto: GetUsersDto): Promise<UserDto[]> {
        return this.userSharedPort.getUserByIds(dto.userIds);
    }
}
