import { UserDto } from "src/shared/dto/user.dto";

export interface UserSharedRepository {
    getAdmins(): Promise<number[]>;
    getAllUsers(): Promise<UserDto[]>;
    getUserById(userId: number): Promise<UserDto | null>;
    getUserByIds(userIds: number[]): Promise<UserDto[]>;
}