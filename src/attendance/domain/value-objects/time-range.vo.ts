export class TimeRange {
    private readonly _checkIn: Date;
    private readonly _checkOut?: Date;

    constructor(checkIn: Date, checkOut?: Date) {
        if (checkOut && checkIn > checkOut) {
            throw new Error('Check-out time cannot be before check-in time.');
        }

        this._checkIn = checkIn;
        this._checkOut = checkOut;
    }

    public get checkIn(): Date {
        return this._checkIn;
    }

    public get checkOut(): Date | undefined {
        return this._checkOut;
    }
}
