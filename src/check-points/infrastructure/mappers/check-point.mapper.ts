import { CheckPoint } from 'src/check-points/domain/check-point.domain';
import { CheckPointEntity } from '../entities/check-point.entity';
import { CheckPointItemMapper } from './check-point-item.mapper';

export class CheckPointMapper {
    static toDomain(entity: CheckPointEntity): CheckPoint {
        return new CheckPoint(
            entity.id,
            entity.organizationId,
            entity.title,
            entity.createdAt,
            entity.isActive,
            entity.items?.map(CheckPointItemMapper.toDomain) || [],
        );
    }

    static toEntity(domain: CheckPoint): CheckPointEntity {
        const entity = new CheckPointEntity();
        entity.id = domain.id;
        entity.organizationId = domain.organizationId;
        entity.title = domain.title;
        entity.createdAt = domain.createdAt;
        entity.isActive = domain.isActive;
        entity.items = domain.items?.map(CheckPointItemMapper.toEntity) || [];
        return entity;
    }
}
