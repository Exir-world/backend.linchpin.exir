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
import { CreatePropertyCategoryHandler } from './application/commands/handlers/create-property-category.handler';
import { UpdatePropertyCategoryHandler } from './application/commands/handlers/update-property-category.handler';
import { DeletePropertyCategoryHandler } from './application/commands/handlers/delete-property-category.handler';
import { GetPropertyCategoriesHandler } from './application/queries/handlers/get-property-categories.handler';
import { CreatePropertyCategoryFeatureHandler } from './application/commands/handlers/create-property-category-feature.handler';
import { GetPropertyCategoryFeaturesHandler } from './application/queries/handlers/get-property-category-features.handler';
import { CreatePropertyFeatureHandler } from './application/commands/handlers/create-property-feature.handler';
import { DeletePropertyFeatureHandler } from './application/commands/handlers/delete-property-feature.handler';
import { PropertyCategoryRepositoryImpl } from './infrastructure/repositories/property-category.repository.impl';
import { PropertyCategoryFeatureRepositoryImpl } from './infrastructure/repositories/property-category-feature.repository.impl';
import { PropertyFeatureRepositoryImpl } from './infrastructure/repositories/property-feature.repository.impl';
import { PropertyCategoryController } from './presentation/controllers/property-category.controller';
import { PropertyCategoryFeatureController } from './presentation/controllers/property-category-feature.controller';
import { PropertyFeatureController } from './presentation/controllers/property-feature.controller';
import { PropertyCategoryEntity } from './infrastructure/entities/property-category.entity';
import { PropertyCategoryFeatureEntity } from './infrastructure/entities/property-category-feature.entity';
import { PropertyFeatureEntity } from './infrastructure/entities/property-feature.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PropertyEntity, PropertyReportEntity, UserPropertyEntity,
            PropertyCategoryEntity, PropertyCategoryFeatureEntity, PropertyFeatureEntity,
        ]),
        CqrsModule,
    ],
    controllers: [
        PropertyController,
        PropertyReportController,
        PropertyUserController,
        PropertyCategoryController,
        PropertyCategoryFeatureController,
        PropertyFeatureController,
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

        {
            provide: 'PropertyCategoryRepository',
            useClass: PropertyCategoryRepositoryImpl,
        },
        {
            provide: 'PropertyCategoryFeatureRepository',
            useClass: PropertyCategoryFeatureRepositoryImpl,
        },
        {
            provide: 'PropertyFeatureRepository',
            useClass: PropertyFeatureRepositoryImpl,
        },

        // Commands
        AssignPropertyHandler,
        CreatePropertyReportHandler,
        CreatePropertyHandler,
        DeletePropertyHandler,
        UnassignPropertyHandler,
        UpdatePropertyHandler,
        ChangeReportStatusHandler,
        CreatePropertyCategoryHandler,
        UpdatePropertyCategoryHandler,
        DeletePropertyCategoryHandler,
        CreatePropertyCategoryFeatureHandler,
        CreatePropertyFeatureHandler,
        DeletePropertyFeatureHandler,

        // Queries
        GetAllPropertiesHandler,
        GetAllReportsHandler,
        GetPropertyByIdHandler,
        GetReportsByPropertyHandler,
        GetUserPropertiesHandler,
        GetPropertyCategoryFeaturesHandler,
        GetPropertyCategoriesHandler,
    ],
})
export class PropertiesModule { }
