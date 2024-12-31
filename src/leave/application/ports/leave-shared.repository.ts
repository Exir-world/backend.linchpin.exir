export interface LeaveSharedRepository {
    createLeave(
        userId: number,
        type: string,
        startTime: Date,
        endTime: Date,
        description: string,
    ): Promise<void>;
}
