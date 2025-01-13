
export interface ILeaveSharedRepository {
    createLeave(
        userId: number,
        type: string,
        startTime: Date,
        endTime: Date,
        description: string,
    ): Promise<void>;

    filterByUserAndRange(
        userId: number,
        startDate: Date,
        endDate: Date
    ): Promise<any[]>;
}
