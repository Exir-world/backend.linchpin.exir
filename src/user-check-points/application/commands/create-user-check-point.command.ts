import { CreateUserCheckPointDto } from "src/user-check-points/presentation/dto/create-user-check-point.dto";

export class CreateUserCheckPointCommand {
    constructor(
        public readonly userId: number,
        public readonly dto: CreateUserCheckPointDto,
    ) { }
}