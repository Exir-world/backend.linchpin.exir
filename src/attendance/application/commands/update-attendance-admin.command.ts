export class UpdateAttendanceAdminCommand {
    constructor(
        public readonly id: number,
        public readonly checkIn?: Date,
        public readonly checkOut?: Date,
    ) { }
}
