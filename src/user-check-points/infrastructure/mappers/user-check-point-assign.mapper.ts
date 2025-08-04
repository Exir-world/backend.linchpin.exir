import { UserCheckpointAssignEntity } from '../entities/user-check-point-assign.entity';
import { UserCheckpointAssign } from '../../domain/user-check-point-assign.domain';

export class UserCheckpointAssignMapper {
    static toDomain(entity: UserCheckpointAssignEntity): UserCheckpointAssign {
        return {
            id: entity.id,
            userId: entity.userId,
            checkpointId: entity.checkpointId,
            startDate: entity.startDate,
            endDate: entity.endDate,
        };
    }

    static toEntity(domain: UserCheckpointAssign): UserCheckpointAssignEntity {
        const entity = new UserCheckpointAssignEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.checkpointId = domain.checkpointId;
        entity.startDate = domain.startDate;
        entity.endDate = domain.endDate;
        return entity;
    }
}