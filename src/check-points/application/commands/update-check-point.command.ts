import { UpdateCheckPointDto } from "src/check-points/presentation/dto/update-check-point.dto";

export class UpdateCheckPointCommand {
    constructor(public readonly id: number, public readonly dto: UpdateCheckPointDto) { }
}