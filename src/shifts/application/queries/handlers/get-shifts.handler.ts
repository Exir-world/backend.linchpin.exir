import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShiftEntity } from "src/shifts/infrastructure/entities/shift.entity";
import { ShiftMapper } from "src/shifts/infrastructure/mappers/shift.mapper";
import { GetShiftsQuery } from "../get-shifts.query";

@QueryHandler(GetShiftsQuery)
export class GetShiftsHandler implements IQueryHandler<GetShiftsQuery> {
    constructor(
        @InjectRepository(ShiftEntity)
        private readonly shiftRepository: Repository<ShiftEntity>
    ) { }

    async execute(_: GetShiftsQuery): Promise<any> {
        const shifts = await this.shiftRepository.find({
            relations: ["shiftTimes"]
        });

        return shifts.map(shift => ShiftMapper.toDomain(shift));
    }
}
