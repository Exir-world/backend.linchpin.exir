import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetShiftsByOrganizationQuery } from "../get-shifts-by-organization.query";
import { ShiftEntity } from "src/shifts/infrastructure/entities/shift.entity";
import { ShiftMapper } from "src/shifts/infrastructure/mappers/shift.mapper";
import { Shift } from "src/shifts/domain/shift.domain";

@QueryHandler(GetShiftsByOrganizationQuery)
export class GetShiftsByOrganizationHandler implements IQueryHandler<GetShiftsByOrganizationQuery> {
    constructor(
        @InjectRepository(ShiftEntity)
        private readonly shiftRepository: Repository<ShiftEntity>
    ) { }

    async execute(query: GetShiftsByOrganizationQuery): Promise<Shift[]> {
        const { organizationId } = query;

        const shifts = await this.shiftRepository.find({
            where: { organizationId },
            relations: ["shiftTimes"]
        });

        return shifts.map(shift => ShiftMapper.toDomain(shift));
    }
}
