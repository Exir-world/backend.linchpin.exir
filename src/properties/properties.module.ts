import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './infrastructure/entities/property.entity';
import { TypeOrmPropertyRepository } from './infrastructure/repositories/typeorm-property.repository';
import { TypeOrmUserPropertyRepository } from './infrastructure/repositories/typeorm-user-property.repository';
import { TypeOrmPropertyReportRepository } from './infrastructure/repositories/typeorm-property-report.repository';
import { PropertyReportEntity } from './infrastructure/entities/property-report.entity';
import { UserPropertyEntity } from './infrastructure/entities/user-property.entity';
import { PropertyController } from './presentation/controllers/property.controller';
import { PropertyReportController } from './presentation/controllers/property-report.controller';
import { PropertyUserController } from './presentation/controllers/property-user.controller';
import { AssignPropertyHandler } from './application/commands/handlers/assign-property.handler';
import { CreatePropertyReportHandler } from './application/commands/handlers/create-property-report.handler';
import { CreatePropertyHandler } from './application/commands/handlers/create-property.handler';
import { DeletePropertyHandler } from './application/commands/handlers/delete-property.handler';
import { UnassignPropertyHandler } from './application/commands/handlers/unassign-property.handler';
import { UpdatePropertyHandler } from './application/commands/handlers/update-property.handler';
import { GetAllPropertiesHandler } from './application/queries/handlers/get-all-properties.handler';
import { GetAllReportsHandler } from './application/queries/handlers/get-all-reports.handler';
import { GetPropertyByIdHandler } from './application/queries/handlers/get-property-by-id.handler';
import { GetReportsByPropertyHandler } from './application/queries/handlers/get-reports-by-property.handler';
import { GetUserPropertiesHandler } from './application/queries/handlers/get-user-properties.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ChangeReportStatusHandler } from './application/commands/handlers/change-report-status.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([PropertyEntity, PropertyReportEntity, UserPropertyEntity]),
        CqrsModule,
    ],
    controllers: [
        PropertyController,
        PropertyReportController,
        PropertyUserController,
    ],
    providers: [
        {
            provide: 'PropertyRepository',
            useClass: TypeOrmPropertyRepository,
        },
        {
            provide: 'UserPropertyRepository',
            useClass: TypeOrmUserPropertyRepository,
        },
        {
            provide: 'PropertyReportRepository',
            useClass: TypeOrmPropertyReportRepository,
        },

        // Commands
        AssignPropertyHandler,
        CreatePropertyReportHandler,
        CreatePropertyHandler,
        DeletePropertyHandler,
        UnassignPropertyHandler,
        UpdatePropertyHandler,
        ChangeReportStatusHandler,

        // Queries
        GetAllPropertiesHandler,
        GetAllReportsHandler,
        GetPropertyByIdHandler,
        GetReportsByPropertyHandler,
        GetUserPropertiesHandler,
    ],
})
export class PropertiesModule { }
