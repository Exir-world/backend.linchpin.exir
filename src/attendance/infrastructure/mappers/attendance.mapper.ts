import { Attendance } from 'src/attendance/domain/attendance';
import { AttendanceEntity } from '../entities/attendance.entity';
import { StopMapper } from './stop.mapper';
import { WorkReportMapper } from './work-report.mapper';

export class AttendanceMapper {
    static toDomain(entity: AttendanceEntity): Attendance {
        const attendance = new Attendance(entity.id, entity.userId);
        attendance.checkIn = entity.checkIn;
        attendance.checkOut = entity.checkOut;
        attendance.lat = entity.lat;
        attendance.lng = entity.lng;
        attendance.stops = StopMapper.toDomainList(entity.stops);
        if (entity.workReport)
            attendance.workReport = WorkReportMapper.toDomain(entity.workReport);

        // جلوگیری از حلقه بازگشتی
        // if (entity.workReport) {
        //     attendance.workReport = {
        //         id: entity.workReport.id,
        //         workReport: entity.workReport.workReport,
        //         accepted: entity.workReport.accepted,
        //         comment: entity.workReport.comment,
        //         acceptedBy: entity.workReport.acceptedBy,
        //     };
        // }

        return attendance;
    }

    static toEntity(domain: Attendance): AttendanceEntity {
        const entity = new AttendanceEntity();
        entity.id = domain.getId;
        entity.userId = domain.getUserId;
        entity.checkIn = domain.getCheckIn;
        entity.checkOut = domain.getCheckOut;
        entity.lat = domain.getLat;
        entity.lng = domain.getLng;

        // جلوگیری از حلقه بازگشتی
        // if (domain.getWorkReport) {
        //     entity.workReport = {
        //         id: domain.getWorkReport.id,
        //         workReport: domain.getWorkReport.report,
        //         accepted: domain.getWorkReport.isAccepted,
        //         comment: domain.getWorkReport.comment,
        //         acceptedBy: domain.getWorkReport.acceptedBy,
        //     } as any; // مقادیر مستقیم به Entity اضافه می‌شوند
        // }

        return entity;
    }

    static toDomainList(entities: AttendanceEntity[]): Attendance[] {
        return entities.map(entity => this.toDomain(entity));
    }
}