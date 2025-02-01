import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateShiftCommand } from "../create-shift.command";
import { ShiftEntity } from "src/shifts/infrastructure/entities/shift.entity";
import { ShiftTimeEntity } from "src/shifts/infrastructure/entities/shift-time.entity";
import { ShiftMapper } from "src/shifts/infrastructure/mappers/shift.mapper";
import { Shift } from "src/shifts/domain/shift.domain";

@CommandHandler(CreateShiftCommand)
export class CreateShiftHandler implements ICommandHandler<CreateShiftCommand> {
    constructor(
        @InjectRepository(ShiftEntity)
        private readonly shiftRepository: Repository<ShiftEntity>,

        @InjectRepository(ShiftTimeEntity)
        private readonly shiftTimeRepository: Repository<ShiftTimeEntity>
    ) { }

    async execute(command: CreateShiftCommand): Promise<Shift> {
        const { organizationId, title, shiftTimes } = command.dto;

        // ایجاد شیفت
        const shiftEntity = this.shiftRepository.create({ organizationId, title });
        await this.shiftRepository.save(shiftEntity);

        // ایجاد شیفت تایمز
        const shiftTimeEntities = shiftTimes.map(shiftTime =>
            this.shiftTimeRepository.create({
                shift: shiftEntity,
                startTime: shiftTime.startTime,
                endTime: shiftTime.endTime,
                type: shiftTime.type
            })
        );

        await this.shiftTimeRepository.save(shiftTimeEntities);

        return ShiftMapper.toDomain(shiftEntity);
    }
}
