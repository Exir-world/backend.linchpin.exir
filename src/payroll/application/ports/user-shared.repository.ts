import { UserDto } from "src/shared/dto/user.dto";

export interface IUserSharedRepository {
    getAllUsers(): Promise<UserDto[]>;
    getUserById(userId: number): Promise<UserDto | null>;
    getUsersByOrgId(orgId: number): Promise<UserDto[]>;
}
