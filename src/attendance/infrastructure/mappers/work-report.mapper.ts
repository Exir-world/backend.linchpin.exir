// src/attendance/infrastructure/mappers/work-report.mapper.ts

import { WorkReport } from 'src/attendance/domain/work-report';
import { WorkReportEntity } from '../entities/work-report.entity';
import { AttendanceMapper } from './attendance.mapper';

export class WorkReportMapper {
    static toDomain(entity: WorkReportEntity): WorkReport {
        const workReport = new WorkReport(null, entity.workReport);
        (workReport as any)._id = entity.id;
        (workReport as any)._accepted = entity.accepted;
        (workReport as any)._comment = entity.comment;
        (workReport as any)._acceptedBy = entity.acceptedBy;

        return workReport;
    }

    static toEntity(domain: WorkReport): WorkReportEntity {
        const entity = new WorkReportEntity();
        entity.id = domain.id;
        entity.workReport = domain.workReport;
        entity.accepted = domain.accepted;
        entity.comment = domain.comment;
        entity.acceptedBy = domain.acceptedBy;

        return entity;
    }
}