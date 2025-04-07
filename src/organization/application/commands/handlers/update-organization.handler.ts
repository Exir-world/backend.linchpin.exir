import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrganizationCommand } from '../update-organization.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from 'src/organization/infrastructure/entities/organization.entity';

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationHandler implements ICommandHandler<UpdateOrganizationCommand> {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly orgRepository: Repository<OrganizationEntity>,
    ) { }

    async execute(command: UpdateOrganizationCommand): Promise<OrganizationEntity | null> {
        const { dto, adminId, organizationId } = command;
        await this.orgRepository.update({ id: organizationId, creatorId: adminId }, { ...dto });
        return this.orgRepository.findOne({ where: { id: organizationId, creatorId: adminId } });
    }
}
