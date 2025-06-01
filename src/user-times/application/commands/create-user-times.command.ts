import { CreateUserTimesDto } from "src/user-times/presentation/dto/create-user-times.dto";

export class CreateUserTimesCommand {
    constructor(public readonly dto: CreateUserTimesDto) { }
}