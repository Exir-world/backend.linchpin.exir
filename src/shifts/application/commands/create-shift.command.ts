import { ICommand } from "@nestjs/cqrs";
import { CreateShiftDto } from "src/shifts/presentation/dto/create-shift.dto";

export class CreateShiftCommand implements ICommand {
    constructor(public readonly dto: CreateShiftDto) { }
}
