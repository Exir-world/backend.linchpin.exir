import { UpdateUserDto } from "src/auth/presentation/dto/update-user.dto";

export class UpdateUserCommand {
    constructor(
        public readonly userId: number,
        public readonly adminId: number,
        public readonly dto: UpdateUserDto,
    ) { }
}
