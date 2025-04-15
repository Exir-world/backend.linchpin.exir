import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePropertyReportCommand } from '../create-property-report.command';
import { PropertyReportRepository } from '../../repositories/property-report.repository';
import { PropertyReportEntity } from 'src/properties/infrastructure/entities/property-report.entity';

@CommandHandler(CreatePropertyReportCommand)
export class CreatePropertyReportHandler implements ICommandHandler<CreatePropertyReportCommand> {
    constructor(
        @Inject('PropertyReportRepository') private readonly repository: PropertyReportRepository,
    ) { }

    async execute(command: CreatePropertyReportCommand) {
        const entity = new PropertyReportEntity();
        entity.userId = command.userId;
        entity.propertyId = command.propertyId;
        entity.report = command.report;
        entity.createdAt = new Date();
        return await this.repository.create(entity);
    }
}
