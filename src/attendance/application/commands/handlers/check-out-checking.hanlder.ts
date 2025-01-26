import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckOutCheckingCommand } from "../check-out-checking.command";
import { AttendanceRepository } from "../../ports/attendance.repository";
import { StopRepository } from "../../ports/stop.repository";

@CommandHandler(CheckOutCheckingCommand)
export class CheckOutCheckingHandler implements ICommandHandler<CheckOutCheckingCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly stopRepo: StopRepository,
    ) { }

    async execute(_: CheckOutCheckingCommand): Promise<any> {
        const attendances = await this.attendanceRepo.findCheckedInAttendances();

        for (let i = 0; i < attendances.length; i++) {
            attendances[i].setCheckOut();
            if (attendances[i].stops.length)
                if (!attendances[i].stops.at(-1).getEndTime)
                    await this.stopRepo.endStop(attendances[i].userId);
        }

        await this.attendanceRepo.save(attendances);

        return { message: 'خروج شما با موفقیت ثبت شد' }
    }
}
