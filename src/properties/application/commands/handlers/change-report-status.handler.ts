import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ChangeReportStatusCommand } from '../change-report-status.command';
import { PropertyReportRepository } from '../../repositories/property-report.repository';
import { Inject } from '@nestjs/common';
import { PropertyReportEntity } from 'src/properties/infrastructure/entities/property-report.entity';
import { PropertyRepository } from '../../repositories/property.repository';
import { PropertyReportStatusEnum } from 'src/properties/domain/enums/property-report-status.enum';
import { PropertyStatusEnum } from 'src/properties/domain/enums/property-status.enum';

@CommandHandler(ChangeReportStatusCommand)
export class ChangeReportStatusHandler implements ICommandHandler<ChangeReportStatusCommand> {
    constructor(
        @Inject('PropertyRepository') private readonly propRepository: PropertyRepository,
        @Inject('PropertyReportRepository') private readonly repository: PropertyReportRepository,
    ) { }

    async execute(command: ChangeReportStatusCommand): Promise<PropertyReportEntity> {
        const { reportId, status } = command;

        const report = await this.repository.updateStatusById(reportId, status);

        await this.propRepository.update(report.propertyId, {
            status: status == PropertyReportStatusEnum.REPAIRED
                ? PropertyStatusEnum.GOOD
                : PropertyStatusEnum.BROKEN
        }
        );

        return report;
    }
}