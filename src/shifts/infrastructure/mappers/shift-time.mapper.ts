import { ShiftTime } from "src/shifts/domain/shift-time.domain";
import { ShiftTimeEntity } from "../entities/shift-time.entity";
import { ShiftMapper } from "./shift.mapper";

export class ShiftTimeMapper {
    static toDomain(entity: ShiftTimeEntity): ShiftTime {
        return new ShiftTime(
            entity.id,
            undefined,
            // ShiftMapper.toDomain(entity.shift),
            entity.startTime,
            entity.endTime,
            entity.type
        );
    }

    static toEntity(domain: ShiftTime): ShiftTimeEntity {
        const entity = new ShiftTimeEntity();
        entity.id = domain.id;
        entity.shift = ShiftMapper.toEntity(domain.shift);
        entity.startTime = domain.startTime;
        entity.endTime = domain.endTime;
        entity.type = domain.type;
        return entity;
    }
}
