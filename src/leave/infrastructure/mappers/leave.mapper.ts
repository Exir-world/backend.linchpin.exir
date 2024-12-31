import { Leave } from 'src/leave/domain/leave';
import { LeaveEntity } from '../entities/leave.entity';

export class LeaveMapper {
    /**
     * تبدیل Entity به Domain
     */
    static toDomain(entity: LeaveEntity): Leave {
        return new Leave(
            entity.id,
            entity.type,
            entity.userId,
            entity.description,
            entity.startTime,
            entity.endTime,
            entity.createdAt,
        );
    }

    /**
     * تبدیل Domain به Entity
     */
    static toEntity(domain: Leave): LeaveEntity {
        const entity = new LeaveEntity();
        entity.id = domain.id;
        entity.type = domain.type;
        entity.userId = domain.userId; // باید UserEntity کامل بارگذاری شود
        entity.description = domain.description;
        entity.startTime = domain.startTime;
        entity.endTime = domain.endTime;
        entity.createdAt = domain.createdAt;
        return entity;
    }
}
