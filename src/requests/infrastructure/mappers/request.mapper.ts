import { RequestDomain } from 'src/requests/domain/request';
import { RequestEntity } from '../entities/request.entity';

export class RequestMapper {
    static toDomain(entity: RequestEntity): RequestDomain {
        return new RequestDomain(
            entity.id,
            entity.type,
            entity.status,
            entity.description,
            entity.adminComment,
            entity.userId,
            entity.startTime,
            entity.endTime,
            entity.reviewedBy,
            entity.reviewedAt,
            entity.createdAt,
            entity.updatedAt,
        );
    }

    static toEntity(domain: RequestDomain): RequestEntity {
        const entity = new RequestEntity();
        entity.id = domain.id;
        entity.type = domain.type;
        entity.status = domain.status;
        entity.description = domain.description;
        entity.adminComment = domain.adminComment;
        entity.startTime = domain.startTime;
        entity.endTime = domain.endTime;
        entity.reviewedAt = domain.reviewedAt;
        entity.userId = domain.userId;
        entity.reviewedBy = domain.reviewedById;
        return entity;
    }
}
