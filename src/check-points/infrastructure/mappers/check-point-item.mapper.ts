import { CheckPointItem } from 'src/check-points/domain/check-point-item.domain';
import { CheckPointItemEntity } from '../entities/check-point-item.entity';

export class CheckPointItemMapper {
  static toDomain(entity: CheckPointItemEntity): CheckPointItem {
    return new CheckPointItem(
      entity.id,
      +entity.lat,
      +entity.lng,
      entity.radius,
      entity.needReport,
      entity.checkPointId,
    );
  }

  static toEntity(domain: CheckPointItem): CheckPointItemEntity {
    const entity = new CheckPointItemEntity();
    entity.id = domain.id;
    entity.lat = domain.lat;
    entity.lng = domain.lng;
    entity.radius = domain.radius;
    entity.needReport = domain.needReport;
    entity.checkPointId = domain.checkPointId;
    return entity;
  }
}
