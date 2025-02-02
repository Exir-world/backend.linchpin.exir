// src/attendance/infrastructure/mappers/work-report.mapper.ts

import { WorkReport } from 'src/attendance/domain/work-report';
import { WorkReportEntity } from '../entities/work-report.entity';
import { AttendanceMapper } from './attendance.mapper';

export class WorkReportMapper {
    static toDomain(entity: WorkReportEntity): WorkReport {
        const workReport = new WorkReport(null, entity.workReport);
        workReport.id = entity.id;
        workReport.accepted = entity.accepted;
        workReport.comment = entity.comment;
        workReport.acceptedBy = entity.acceptedBy;
        if (entity.attendance)
            workReport.attendance.id = entity.attendance.id;

        return workReport;
    }

    static toEntity(domain: WorkReport): WorkReportEntity {
        const entity = new WorkReportEntity();
        entity.id = domain.id;
        entity.workReport = domain.workReport;
        entity.accepted = domain.accepted;
        entity.comment = domain.comment;
        entity.acceptedBy = domain.acceptedBy;
        if (domain.attendance)
            entity.attendance = AttendanceMapper.toEntity(domain.attendance);

        return entity;
    }
}