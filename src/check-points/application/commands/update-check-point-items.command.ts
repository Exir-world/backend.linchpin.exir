import { UpdateCheckPointItemsDto } from "src/check-points/presentation/dto/update-check-point-items.dto";

export class UpdateCheckPointItemsCommand {
    constructor(
        public readonly checkPointId: number,
        public readonly dto: UpdateCheckPointItemsDto,
    ) { }
}
