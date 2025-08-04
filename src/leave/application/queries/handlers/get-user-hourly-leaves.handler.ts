import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LeaveRepository } from '../../ports/leave.repository';
import { Leave } from 'src/leave/domain/leave';
import { GetHourlyUserLeavesQuery } from '../get-user-hourly-leaves.query';
import { DateUtil } from 'src/common/utils/date.util';

@QueryHandler(GetHourlyUserLeavesQuery)
export class GetHourlyUserLeavesHandler implements IQueryHandler<GetHourlyUserLeavesQuery> {
    constructor(
        private readonly leaveRepository: LeaveRepository,
    ) { }

    async execute(query: GetHourlyUserLeavesQuery): Promise<any> {
        const startDate = query.startDate ?? new Date(DateUtil.getStartOfPreviousMonth(1)).toISOString();
        const endDate = query.endDate ?? new Date().toISOString();
        const leaves = await this.leaveRepository.getUserHourlyLeaveRequests(query.userId, startDate, endDate);

        const now = new Date();
        const last1DayStart = new Date(now);
        last1DayStart.setDate(now.getDate() - 1);

        const last7DayStart = new Date(now);
        last7DayStart.setDate(now.getDate() - 7);

        const last31DayStart = new Date(now);
        last31DayStart.setDate(now.getDate() - 31);

        const filterLeaves = (from: Date, to: Date) =>
            leaves.filter((leave: Leave) => {
                const leaveDate = new Date(leave.startTime);
                return leaveDate >= from && leaveDate <= to;
            });

        const calculateDuration = (filteredLeaves: Leave[]) =>
            filteredLeaves.reduce((total, leave) => {
                const start = new Date(leave.startTime).getTime();
                const end = new Date(leave.endTime).getTime();
                const duration = (end - start) / (1000 * 60); // duration in minutes
                return total + duration;
            }, 0);

        const last1DayLeaves = filterLeaves(last1DayStart, now);
        const last7DayLeaves = filterLeaves(last7DayStart, now);
        const last31DayLeaves = filterLeaves(last31DayStart, now);

        const formatDuration = (minutes: number) => {
            const hrs = Math.floor(minutes / 60);
            const mins = Math.round(minutes % 60);
            return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        };

        return {
            startDate,
            endDate,
            last1DayDuration: formatDuration(calculateDuration(last1DayLeaves)),
            last7DayDuration: formatDuration(calculateDuration(last7DayLeaves)),
            last31DayDuration: formatDuration(calculateDuration(last31DayLeaves)),
            leaves,
        };
    }
}
