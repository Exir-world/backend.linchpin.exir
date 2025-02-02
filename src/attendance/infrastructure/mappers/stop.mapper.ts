import { Stop } from "src/attendance/domain/stop";
import { StopEntity } from "../entities/stop.entity";
import { DateUtil } from "src/common/utils/date.util";

export class StopMapper {
    /**
     * Map Stop Entity to Stop DTO
     * @param stop - Stop Entity
     * @returns Stop
     */
    static toDomain(stop: StopEntity): Stop {
        return new Stop(
            stop.id,
            stop.attendance?.id,
            stop.startTime,
            stop.endTime,
            stop.reason,
        );
    }

    /**
     * Map Stop DTO to Stop Entity
     * @param dto - Stop
     * @returns Partial<Stop>
     */
    static toEntity(dto: Stop): Partial<StopEntity> {
        const entity = new StopEntity();
        entity.id = 0;
        entity.startTime = dto.getStartTime;
        if (dto.getReason)
            entity.reason = dto.getReason;
        if (dto.getEndTime) {
            entity.endTime = dto.getEndTime;
        }
        return entity;
    }

    /**
     * Map an array of Stop Entities to an array of Stop DTOs
     * @param stops - Array of Stop Entities
     * @returns Array<Stop>
     */
    static toDomainList(stops: StopEntity[]): Stop[] {
        return stops?.map(stop => this.toDomain(stop));
    }
}
