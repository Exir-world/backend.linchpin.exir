import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDepartmentCommand } from '../update-department.command';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/organization/infrastructure/entities/department.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateDepartmentCommand)
export class UpdateDepartmentHandler implements ICommandHandler<UpdateDepartmentCommand> {
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly depRepo: Repository<DepartmentEntity>,
    ) { }

    async execute(command: UpdateDepartmentCommand) {
        const { id, updateDepartmentDto } = command;
        await this.depRepo.update(id, updateDepartmentDto);
    }
}
