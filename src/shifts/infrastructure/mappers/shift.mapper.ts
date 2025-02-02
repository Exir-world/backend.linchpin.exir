import { Shift } from "src/shifts/domain/shift.domain";
import { ShiftEntity } from "../entities/shift.entity";
import { ShiftTimeMapper } from "./shift-time.mapper";

export class ShiftMapper {
    static toDomain(entity: ShiftEntity): Shift {
        return new Shift(entity.id, entity.organizationId, entity.title, entity.shiftTimes?.map(time => ShiftTimeMapper.toDomain(time)));
    }

    static toEntity(domain: Shift): ShiftEntity {
        const entity = new ShiftEntity();
        entity.id = domain.id;
        entity.organizationId = domain.organizationId;
        entity.title = domain.title;
        return entity;
    }
}
