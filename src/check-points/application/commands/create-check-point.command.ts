import { CreateCheckPointDto } from "src/check-points/presentation/dto/create-check-point.dto";

export class CreateCheckPointCommand {
    constructor(public readonly dto: CreateCheckPointDto) { }
}
