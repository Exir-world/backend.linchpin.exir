import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamCommand } from '../create-team.command';
import { TeamEntity } from 'src/organization/infrastructure/entities/team.entity';
import { OrganizationEntity } from 'src/organization/infrastructure/entities/organization.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamRepo: Repository<TeamEntity>,
        @InjectRepository(OrganizationEntity)
        private readonly orgRepo: Repository<OrganizationEntity>
    ) { }

    async execute(command: CreateTeamCommand): Promise<TeamEntity> {
        const {
            creatorId,
            organizationId,
            title,
            supervisorId,
            color,
            description,
        } = command;

        const organization = await this.orgRepo.findOne({
            where: { id: organizationId, creatorId },
        });

        if (!organization)
            throw new BadRequestException('Organization not found or you are not the creator.');

        const team = this.teamRepo.create({
            organizationId,
            title,
            supervisorId,
            color,
            description,
        });

        return this.teamRepo.save(team);
    }
}
