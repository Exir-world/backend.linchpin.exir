import { Permission } from "src/auth/domain/enums/permission.enum";
import { UserDto } from "src/shared/dto/user.dto";

export interface UserSharedRepository {
    getAdmins(organizationId: number, permissions: Permission[]): Promise<number[]>;
    getAllUsers(): Promise<UserDto[]>;
    getUserById(userId: number): Promise<UserDto | null>;
    getUserByIds(userIds: number[]): Promise<UserDto[]>;
}