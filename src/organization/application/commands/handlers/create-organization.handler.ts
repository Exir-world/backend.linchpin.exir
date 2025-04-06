import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationCommand } from '../create-organization.command';
import { OrganizationEntity } from 'src/organization/infrastructure/entities/organization.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler implements ICommandHandler<CreateOrganizationCommand> {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly orgRepo: Repository<OrganizationEntity>,
    ) { }

    async execute(command: CreateOrganizationCommand): Promise<OrganizationEntity> {
        const { creatorId, name, address, description } = command;

        const existingOrgsCount = await this.orgRepo.count({ where: { creatorId } });
        if (existingOrgsCount >= 3) {
            throw new BadRequestException('Creator cannot have more than 3 organizations.');
        }

        const newOrg = this.orgRepo.create({
            creatorId, name, address, description
        });
        return this.orgRepo.save(newOrg);
    }
}
