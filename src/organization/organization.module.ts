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

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrganizationEntity,
            TeamEntity,
            SelfImprovementEntity,
            SelfImprovementItemEntity,
            LocationEntity,
            SelfImprovementSubItemEntity,
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

        {
            provide: 'OrganizationSharedPort',
            useClass: OrganizationService,
        },


        // Command Handlers
        CreateSelfImprovementHandler,
        CreateOrganizationHandler,
        CreateTeamHandler,

        // Query Handlers
        GetSelfImprovementByOrgIdHandler,
        GetSelfImprovementsSubItemsByItemIdHandler,
        GetTeamsByOrgIdHandler,
        GetLocationByOrgIdHandler,
    ],
    exports: ['OrganizationSharedPort']
})
export class OrganizationModule { }
