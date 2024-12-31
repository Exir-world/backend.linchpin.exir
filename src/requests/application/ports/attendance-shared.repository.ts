export abstract class IAttendanceSharedRepository {
    abstract manualCheckIn(
        userId: number,
        time: Date,
    ): Promise<void>;

    abstract manualCheckOut(
        userId: number,
        time: Date,
    ): Promise<void>;
}