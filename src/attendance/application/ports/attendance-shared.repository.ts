export interface AttendanceSharedRepository {
    manualCheckIn(
        userId: number,
        time: Date,
    ): Promise<void>;

    manualCheckOut(
        userId: number,
        time: Date,
    ): Promise<void>;
}