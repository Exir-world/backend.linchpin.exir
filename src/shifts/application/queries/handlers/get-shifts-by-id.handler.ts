import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ShiftEntity } from "src/shifts/infrastructure/entities/shift.entity";
import { ShiftMapper } from "src/shifts/infrastructure/mappers/shift.mapper";
import { GetShiftsByIdQuery } from "../get-shifts-by-id.query";

@QueryHandler(GetShiftsByIdQuery)
export class GetShiftsByIdHandler implements IQueryHandler<GetShiftsByIdQuery> {
    constructor(
        @InjectRepository(ShiftEntity)
        private readonly shiftRepository: Repository<ShiftEntity>
    ) { }

    async execute(query: GetShiftsByIdQuery): Promise<any> {
        const shifts = await this.shiftRepository.find({
            where: { id: In(query.ids) },
            relations: ["shiftTimes"]
        });

        return shifts.map(shift => ShiftMapper.toDomain(shift));
    }
}
