import { WeeklyTimesDomain } from 'src/user-times/domain/weekly-times.domain';
import { WeeklyTimesEntity } from '../entities/weekly-times.entity';

export class WeeklyTimesMapper {
    static toDomain(entity: WeeklyTimesEntity): WeeklyTimesDomain {
        return new WeeklyTimesDomain(
            entity.id,
            entity.dayOfWeek,
            entity.startTime,
            entity.endTime,
            entity.isAbsent,
        );
    }

    static toEntity(domain: WeeklyTimesDomain): WeeklyTimesEntity {
        const entity = new WeeklyTimesEntity();
        entity.id = domain.id;
        entity.dayOfWeek = domain.dayOfWeek;
        entity.startTime = domain.startTime;
        entity.endTime = domain.endTime;
        entity.isAbsent = domain.isAbsent;
        // Assign a default value or map from domain if available
        entity.userTimes = (domain as any).userTimes ?? null;
        return entity;
    }

    static toDomainList(entities: WeeklyTimesEntity[]): WeeklyTimesDomain[] {
        return entities.map(entity => this.toDomain(entity));
    }

    static toEntityList(domains: WeeklyTimesDomain[]): WeeklyTimesEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
}
