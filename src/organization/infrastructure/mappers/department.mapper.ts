// infrastructure/mappers/department.mapper.ts

import { Department } from "src/organization/domain/department.domain";
import { DepartmentEntity } from "../entities/department.entity";

export class DepartmentMapper {
    static toDomain(entity: DepartmentEntity): Department {
        return new Department(
            entity.id,
            entity.organizationId,
            entity.title,
            entity.description,
            entity.supervisorId,
            entity.teams // Optional: می‌تونی اینو با TeamMapper تبدیل کنی
        );
    }

    static toEntity(domain: Department): DepartmentEntity {
        const entity = new DepartmentEntity();
        entity.id = domain.id;
        entity.organizationId = domain.organizationId;
        entity.title = domain.title;
        entity.description = domain.description;
        entity.supervisorId = domain.supervisorId;
        // entity.teams = domain.teams; // Optional
        return entity;
    }

    static toDomainList(entities: DepartmentEntity[]): Department[] {
        return entities.map(entity => this.toDomain(entity));
    }

    static toEntityList(domains: Department[]): DepartmentEntity[] {
        return domains.map(domain => this.toEntity(domain));
    }
}
