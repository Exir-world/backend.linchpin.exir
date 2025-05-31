import { UserCheckPoint } from 'src/user-check-points/domain/user-check-point.domain';
import { UserCheckPointEntity } from '../entities/user-check-point.entity';
import { UserCheckPointAttachmentMapper } from './user-check-point-attachment.mapper';

export class UserCheckPointMapper {
    static toDomain(entity: UserCheckPointEntity): UserCheckPoint {
        return new UserCheckPoint(
            entity.id,
            entity.userId,
            +entity.lat,
            +entity.lng,
            entity.report,
            entity.checkPointId,
            entity.createdAt,
            entity.attachments?.map(UserCheckPointAttachmentMapper.toDomain) || [],
        );
    }

    static toEntity(domain: UserCheckPoint): UserCheckPointEntity {
        const entity = new UserCheckPointEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.lat = domain.lat;
        entity.lng = domain.lng;
        entity.report = domain.report;
        entity.checkPointId = domain.checkPointId;
        entity.createdAt = domain.createdAt;
        entity.attachments =
            domain.attachments?.map(UserCheckPointAttachmentMapper.toEntity) || [];

        // اگر خواستی join بزنی به checkPoint، این خط رو فعال کن:
        // entity.checkPoint = CheckPointMapper.toEntity(checkPointDomainObject);

        return entity;
    }
}
