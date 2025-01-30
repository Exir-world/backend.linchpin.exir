import { Attachment } from "src/tasks/domain/attachment.domain";
import { AttachmentEntity } from "../entities/attachment.entity";

export class AttachmentMapper {
    static toDomain(entity: AttachmentEntity): Attachment {
        return new Attachment(
            entity.id,
            entity.fileType,
            entity.fileName,
            entity.createdAt,
            entity.fileSize,
            entity.link
        );
    }

    static toEntity(domain: Attachment): AttachmentEntity {
        const entity = new AttachmentEntity();
        entity.id = domain.id;
        entity.fileType = domain.fileType;
        entity.fileName = domain.fileName;
        entity.createdAt = domain.createdAt;
        entity.fileSize = domain.fileSize;
        entity.link = domain.link;
        return entity;
    }
}
