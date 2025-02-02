import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShiftEntity } from "src/shifts/infrastructure/entities/shift.entity";
import { ShiftMapper } from "src/shifts/infrastructure/mappers/shift.mapper";
import { GetShiftQuery } from "../get-shift.query";

@QueryHandler(GetShiftQuery)
export class GetShiftHandler implements IQueryHandler<GetShiftQuery> {
    constructor(
        @InjectRepository(ShiftEntity)
        private readonly shiftRepository: Repository<ShiftEntity>
    ) { }

    async execute(query: GetShiftQuery): Promise<any> {
        const { id } = query;

        const shift = await this.shiftRepository.findOne({
            where: { id },
            relations: ["shiftTimes"]
        });

        return ShiftMapper.toDomain(shift);
    }
}
