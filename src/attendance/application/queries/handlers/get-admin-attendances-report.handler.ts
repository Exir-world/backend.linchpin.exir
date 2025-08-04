import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AttendanceRepository } from '../../ports/attendance.repository';
import { ILeaveSharedRepository } from '../../ports/leave-shared.repository';
import { DateUtil } from 'src/common/utils/date.util';
import { Inject } from '@nestjs/common';
import { LeaveTypeEnum } from 'src/leave/domain/enums/leave-type.enum';
import { GetAdminAttendancesReportQuery } from '../get-admin-attendances-report.query';

@QueryHandler(GetAdminAttendancesReportQuery)
export class GetAdminAttendancesReportHandler implements IQueryHandler<GetAdminAttendancesReportQuery> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        @Inject('ILeaveSharedRepository')
        private readonly leaveRepo: ILeaveSharedRepository,
    ) { }

    async execute(query: GetAdminAttendancesReportQuery): Promise<any> {
        const { startDate, endDate } = query;

        const lunchTime = { startTime: '14:00:00', endTime: '14:40:00' };
        const lunchDuration = 40;

        const attendances = await this.attendanceRepo.filterByRange(new Date(startDate), new Date(endDate), true);

        let groupedAttendances: any = attendances.reduce((acc, attendance) => {
            if (!acc[attendance.userId]) {
                acc[attendance.userId] = { userId: attendance.userId, attendances: [] };
            }
            acc[attendance.userId].attendances.push(attendance);
            return acc;
        }, {});

        groupedAttendances = Object.values(groupedAttendances);

        for (let i = 0; i < groupedAttendances.length; i++) {
            groupedAttendances[i].attendances = Object.entries(groupedAttendances[i].attendances
                .reduce((acc, attendance) => {
                    const date = DateUtil.fromJsDate(attendance.checkIn).toISODate();
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(attendance);
                    return acc;
                }, {}))
                .map(([date, attendances]: any) => {
                    let firstCheckIn =
                        DateUtil.parseTimeFromDate(attendances.reduce((earliest, current) => {
                            return current.checkIn < earliest.checkIn ? current : earliest;
                        }).checkIn);

                    firstCheckIn = firstCheckIn === 'Invalid DateTime' ? '-' : firstCheckIn;

                    let lastCheckOut =
                        DateUtil.parseTimeFromDate(attendances.reduce((latest, current) => {
                            return current.checkOut > latest.checkOut ? current : latest;
                        }).checkOut);

                    lastCheckOut = lastCheckOut === 'Invalid DateTime' ? '-' : lastCheckOut;

                    const atts = attendances.map((a: any) => {
                        const checkIn = DateUtil.parseTimeFromDate(a.checkIn);
                        const checkOut = DateUtil.parseTimeFromDate(a.checkOut);
                        return `${checkIn === 'Invalid DateTime' ? '' : checkIn} - ${checkOut === 'Invalid DateTime' ? '' : checkOut}`;
                    }).join(' , \n');

                    let workTime = attendances.reduce((total, record) => {
                        const checkIn = DateUtil.fromJsDate(record.checkIn);
                        const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;
                        const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

                        return total + (attendanceMinutes);
                    }, 0);

                    workTime = Math.floor(workTime);

                    const afterLunch = lastCheckOut !== '-' && `${lastCheckOut}:00` > lunchTime.endTime;
                    const workTimeWithLunch = !afterLunch ? workTime : workTime - lunchDuration;

                    const workHours = Math.floor(workTime / 60);
                    const workMinutes = workTime % 60;
                    const formattedWorkTime = `${workHours.toString().padStart(2, '0')}:${workMinutes.toString().padStart(2, '0')}`;

                    const workWithLunchHours = Math.floor(workTimeWithLunch / 60);
                    const workWithLunchMinutes = workTimeWithLunch % 60;
                    const formattedWorkTimeWithLunch = `${workWithLunchHours.toString().padStart(2, '0')}:${workWithLunchMinutes.toString().padStart(2, '0')}`;

                    return {
                        userId: attendances?.[0]?.userId,
                        attendances: atts,
                        date,
                        shamsiDate: DateUtil.convertToJalaliWithDayOfWeek(date),
                        firstCheckIn,
                        lastCheckOut,
                        workTime: formattedWorkTime,
                        workTimeWithLunch: formattedWorkTimeWithLunch,
                        afterLunch,
                    };
                });
        }

        return groupedAttendances


        // const res = Object.entries(attendances.reduce((acc, attendance) => {
        //     const date = DateUtil.fromJsDate(attendance.checkIn).toISODate();
        //     if (!acc[date]) {
        //         acc[date] = [];
        //     }
        //     acc[date].push(attendance);
        //     return acc;
        // }, {}))
        //     .map(([date, attendances]: any) => {
        //         let firstCheckIn =
        //             DateUtil.parseTimeFromDate(attendances.reduce((earliest, current) => {
        //                 return current.checkIn < earliest.checkIn ? current : earliest;
        //             }).checkIn);

        //         firstCheckIn = firstCheckIn === 'Invalid DateTime' ? '-' : firstCheckIn;

        //         let lastCheckOut =
        //             DateUtil.parseTimeFromDate(attendances.reduce((latest, current) => {
        //                 return current.checkOut > latest.checkOut ? current : latest;
        //             }).checkOut);

        //         lastCheckOut = lastCheckOut === 'Invalid DateTime' ? '-' : lastCheckOut;

        //         const atts = attendances.map((a: any) => {
        //             const checkIn = DateUtil.parseTimeFromDate(a.checkIn);
        //             const checkOut = DateUtil.parseTimeFromDate(a.checkOut);
        //             return `${checkIn === 'Invalid DateTime' ? '' : checkIn} - ${checkOut === 'Invalid DateTime' ? '' : checkOut}`;
        //         }).join(' , \n');

        //         let workTime = attendances.reduce((total, record) => {
        //             const checkIn = DateUtil.fromJsDate(record.checkIn);
        //             const checkOut = record.checkOut ? DateUtil.fromJsDate(record.checkOut) : checkIn;
        //             const attendanceMinutes = checkOut.diff(checkIn, 'minutes').minutes;

        //             return total + (attendanceMinutes);
        //         }, 0);

        //         workTime = Math.floor(workTime);

        //         const workHours = Math.floor(workTime / 60);
        //         const workMinutes = workTime % 60;
        //         const formattedWorkTime = `${workHours.toString().padStart(2, '0')}:${workMinutes.toString().padStart(2, '0')}`;

        //         return {
        //             userId: attendances?.[0]?.userId,
        //             attendances: atts,
        //             date,
        //             shamsiDate: DateUtil.convertToJalaliWithDayOfWeek(date),
        //             firstCheckIn,
        //             lastCheckOut,
        //             workTime: formattedWorkTime,
        //         };
        //     });

        // return res
    }
}
