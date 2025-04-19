import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from '../create-department.command';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/organization/infrastructure/entities/department.entity';
import { Repository } from 'typeorm';
import { TeamEntity } from 'src/organization/infrastructure/entities/team.entity';

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler implements ICommandHandler<CreateDepartmentCommand> {
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly depRepo: Repository<DepartmentEntity>,
        @InjectRepository(TeamEntity)
        private readonly teamRepository: Repository<TeamEntity>,
    ) { }

    async execute(command: CreateDepartmentCommand) {
        const { createDepartmentDto } = command;
        const dep = this.depRepo.create(createDepartmentDto);
        const newDepartment = await this.depRepo.save(dep);

        const team = this.teamRepository.create({
            title: 'default',
            departmentId: newDepartment.id,
            supervisorId: newDepartment.supervisorId,
        });
        await this.teamRepository.save(team);

        return newDepartment;
    }
}
