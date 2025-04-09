import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamCommand } from '../create-team.command';
import { TeamEntity } from 'src/organization/infrastructure/entities/team.entity';
import { OrganizationEntity } from 'src/organization/infrastructure/entities/organization.entity';
import { BadRequestException } from '@nestjs/common';
import { DepartmentEntity } from 'src/organization/infrastructure/entities/department.entity';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamRepo: Repository<TeamEntity>,
        @InjectRepository(OrganizationEntity)
        private readonly orgRepo: Repository<OrganizationEntity>,
        @InjectRepository(DepartmentEntity)
        private readonly depRepo: Repository<DepartmentEntity>
    ) { }

    async execute(command: CreateTeamCommand): Promise<TeamEntity> {
        const {
            creatorId,
            departmentId,
            title,
            supervisorId,
            color,
            description,
        } = command;

        const dep = await this.depRepo.findOne({
            where: { id: departmentId, organization: { creatorId } },
        });

        if (!dep)
            throw new BadRequestException('Department not found.');

        const team = this.teamRepo.create({
            departmentId,
            title,
            supervisorId,
            color,
            description,
        });

        return this.teamRepo.save(team);
    }
}
