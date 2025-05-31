import { UserCheckPointAttachment } from 'src/user-check-points/domain/user-check-point-attachment.domain';
import { UserCheckPointAttachmentEntity } from '../entities/user-check-point-attachment.entity';

export class UserCheckPointAttachmentMapper {
  static toDomain(entity: UserCheckPointAttachmentEntity): UserCheckPointAttachment {
    return new UserCheckPointAttachment(
      entity.id,
      entity.filename,
      entity.fileType,
      entity.fileUrl,
      entity.description ?? null,
      entity.createdAt,
      entity.userCheckPointId,
    );
  }

  static toEntity(domain: UserCheckPointAttachment): UserCheckPointAttachmentEntity {
    const entity = new UserCheckPointAttachmentEntity();
    entity.id = domain.id;
    entity.filename = domain.filename;
    entity.fileType = domain.fileType;
    entity.fileUrl = domain.fileUrl;
    entity.description = domain.description;
    entity.createdAt = domain.createdAt;
    entity.userCheckPointId = domain.userCheckPointId;

    // اگر خواستی join بزنی به userCheckPoint، این خط رو فعال کن:
    // entity.userCheckPoint = UserCheckPointMapper.toEntity(userCheckPointDomainObject);

    return entity;
  }
}
