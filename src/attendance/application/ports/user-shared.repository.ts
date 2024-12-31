import { UserDto } from "src/shared/dto/user.dto";

export interface IUserSharedRepository {
    getUserById(userId: number): Promise<UserDto | null>;
}
