import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckOutCheckingCommand } from "../check-out-checking.command";
import { AttendanceRepository } from "../../ports/attendance.repository";
import { StopRepository } from "../../ports/stop.repository";
import { I18nService } from "nestjs-i18n";

@CommandHandler(CheckOutCheckingCommand)
export class CheckOutCheckingHandler implements ICommandHandler<CheckOutCheckingCommand> {
    constructor(
        private readonly attendanceRepo: AttendanceRepository,
        private readonly stopRepo: StopRepository,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: CheckOutCheckingCommand): Promise<any> {
        const attendances = await this.attendanceRepo.findCheckedInAttendances(command.userIds);
        const stops = [];
        for (let i = 0; i < attendances.length; i++) {
            attendances[i].setCheckOut();
            if (attendances[i].stops.length)
                if (!attendances[i].stops.at(-1).getEndTime) {
                    attendances[i].stops.at(-1).endStop();
                    stops.push(attendances[i].stops.at(-1));
                }
        }

        await this.attendanceRepo.save(attendances);
        await this.stopRepo.save(stops);

        return { message: this.i18n.t('attendance.checkOut.success') }
    }
}
