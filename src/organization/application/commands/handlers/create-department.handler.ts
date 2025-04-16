import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from '../create-department.command';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/organization/infrastructure/entities/department.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler implements ICommandHandler<CreateDepartmentCommand> {
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly depRepo: Repository<DepartmentEntity>,
    ) { }

    async execute(command: CreateDepartmentCommand) {
        const { createDepartmentDto } = command;
        const dep = this.depRepo.create(createDepartmentDto);
        return this.depRepo.save(dep);
    }
}
