import { UserTimesDomain } from 'src/user-times/domain/user-times.domain';
import { UserTimesEntity } from '../entities/user-times.entity';
import { WeeklyTimesMapper } from './weekly-times.mapper';

export class UserTimesMapper {
    static toDomain(entity: UserTimesEntity): UserTimesDomain {
        return new UserTimesDomain(
            entity.id,
            entity.userId,
            entity.createdAt,
            entity.weeklyTimes?.map(WeeklyTimesMapper.toDomain) || [],
        );
    }

    static toEntity(domain: UserTimesDomain): UserTimesDomain {
        const entity = new UserTimesEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.createdAt = domain.createdAt;
        entity.weeklyTimes = domain.weeklyTimes?.map(WeeklyTimesMapper.toEntity) || [];
        return entity;
    }
}
