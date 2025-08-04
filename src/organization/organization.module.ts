import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './infrastructure/entities/organization.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/auth/auth.module';
import { OrganizationService } from './application/services/organization.service';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { GetTeamsByOrgIdHandler } from './application/queries/handlers/get-teams-by-org-id.handler';
import { TeamEntity } from './infrastructure/entities/team.entity';
import { SelfImprovementEntity } from './infrastructure/entities/self-improvement.entity';
import { SelfImprovementItemEntity } from './infrastructure/entities/self-improvement-item.entity';
import { CreateSelfImprovementHandler } from './application/commands/handlers/create-self-improvement.handler';
import { GetSelfImprovementByOrgIdHandler } from './application/queries/handlers/get-self-improvements-by-org-id.handler';
import { GetLocationByOrgIdHandler } from './application/queries/handlers/get-location-by-org-id.handler';
import { LocationEntity } from './infrastructure/entities/location.entity';
import { SelfImprovementSubItemEntity } from './infrastructure/entities/self-improvement-subitem.entity';
import { GetSelfImprovementsSubItemsByItemIdHandler } from './application/queries/handlers/get-self-improvements-subitems-by-item-id.handler';
import { CreateOrganizationHandler } from './application/commands/handlers/create-organization.handler';
import { CreateTeamHandler } from './application/commands/handlers/create-team.handler';
import { GetOrganizationsByAdminIdHandler } from './application/queries/handlers/get-organizations-by-admin-id.handler';
import { UpdateOrganizationHandler } from './application/commands/handlers/update-organization.handler';
import { DepartmentEntity } from './infrastructure/entities/department.entity';
import { GetDepartmentsByOrgIdHandler } from './application/queries/handlers/get-departments-by-org-id.handler';
import { GetTeamsByDepartmentIdHandler } from './application/queries/handlers/get-teams-by-department-id.handler';
import { CreateDepartmentHandler } from './application/commands/handlers/create-department.handler';
import { UpdateDepartmentHandler } from './application/commands/handlers/update-department.handler';
import { GetDepartmentHandler } from './application/queries/handlers/get-department.handler';
import { OrganizationSettingsRepositoryPort } from './application/ports/organization-settings.repository';
import { TypeOrmOrganizationSettingsRepository } from './infrastructure/repositories/typeorm-organization-settings.repository';
import { OrganizationSettings } from './infrastructure/entities/organization-settings.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrganizationEntity,
            TeamEntity,
            SelfImprovementEntity,
            SelfImprovementItemEntity,
            LocationEntity,
            SelfImprovementSubItemEntity,
            DepartmentEntity,
            OrganizationSettings,
        ]),
        CqrsModule,
        forwardRef(() => AuthModule),
    ],
    controllers: [OrganizationController],
    providers: [
        // Services
        OrganizationService,

        // Repositories
        // LeaveRepositoryImpl,
        // {
        //     provide: LeaveRepository,
        //     useClass: LeaveRepositoryImpl,
        // },
        // {
        //     provide: 'LeaveSharedRepository',
        //     useClass: LeaveSharedRepositoryImpl,
        // },
        TypeOrmOrganizationSettingsRepository,
        {
            provide: 'OrganizationSharedPort',
            useClass: OrganizationService,
        },

        {
            provide: OrganizationSettingsRepositoryPort,
            useClass: TypeOrmOrganizationSettingsRepository,
        },


        // Command Handlers
        CreateSelfImprovementHandler,
        CreateOrganizationHandler,
        CreateTeamHandler,
        UpdateOrganizationHandler,
        CreateDepartmentHandler,
        UpdateDepartmentHandler,

        // Query Handlers
        GetSelfImprovementByOrgIdHandler,
        GetSelfImprovementsSubItemsByItemIdHandler,
        GetTeamsByOrgIdHandler,
        GetLocationByOrgIdHandler,
        GetOrganizationsByAdminIdHandler,
        GetDepartmentsByOrgIdHandler,
        GetTeamsByDepartmentIdHandler,
        GetDepartmentHandler,
    ],
    exports: ['OrganizationSharedPort', OrganizationSettingsRepositoryPort]
})
export class OrganizationModule { }
